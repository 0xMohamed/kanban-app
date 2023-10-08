import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import arrayMove from '@/utils/arrayMove';
import {
	ProjectModel,
	PagesBehavior,
	Section,
	ContentItem,
	Scene,
	Transform,
	File,
} from '@/types/UserProjectModel';

type Options = Record<string, string>;
type ViewStyle = Record<string, Options>;

const viewStyleOptions: ViewStyle = {
	areaLine: { y1: '', y2: '' },
};

function assertIsError(error: unknown): asserts error is Error {
	// if you have nodejs assert:
	// assert(error instanceof Error);
	// otherwise
	if (!(error instanceof Error)) {
		throw error;
	}
}

export const getProject = createAsyncThunk(
	'project/getProject',
	async (arg: { id: number | string }, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		console.log('getProject');

		try {
			const project = await fetch(`http://localhost:8000/${arg.id}`).then((response) =>
				response.json(),
			);
			const mode = await fetch(`http://localhost:${project['themeId']}/mode`).then((response) =>
				response.json(),
			);
			localStorage.setItem('theme', JSON.stringify(mode));
			const styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.setAttribute('data-global', 'mode');
			styleElement.innerHTML = mode.css_minify;
			document.head.append(styleElement);

			return project;
		} catch (error) {
			assertIsError(error);
			console.error(error.message);
			return rejectWithValue(error.message);
		}
	},
);

export const changeThemeProject = createAsyncThunk(
	'project/getTheme',
	async (arg: { theme: string }, thunkAPI) => {
		console.log('changeThemeProject');

		const { rejectWithValue } = thunkAPI;
		try {
			const mode = await fetch(`http://localhost:${arg.theme}/mode`).then((response) =>
				response.json(),
			);
			const styleElement = document.querySelector('[data-global]') as HTMLStyleElement;
			console.log(styleElement);
			localStorage.setItem('theme', JSON.stringify(mode));

			styleElement.innerHTML = mode.css_minify;
			return { key: arg.theme, extraCss: mode['extra_css'] };
		} catch (error) {
			assertIsError(error);
			console.error(error?.message);
			return rejectWithValue(error?.message);
		}
	},
);

type SliceState = {
	isLoading: boolean;
	project: ProjectModel | null;
	error: string | null;
	requireSave: boolean;
};

const initialState: SliceState = {
	isLoading: true,
	project: null,
	error: null,
	requireSave: false, // and any action in projct slice do true if isn`t true
};

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		// Section settings bar

		cloneSection: (
			state,
			action: PayloadAction<{ groupIndex?: number; pageIndex: number; sectionId: number }>,
		) => {
			const { pageIndex, sectionId } = action.payload;
			const sectionIndex = state.project!.content[pageIndex].sections.findIndex(
				(section) => section.id === sectionId,
			);
			state.project!.content[pageIndex].sections.splice(sectionIndex + 1, 0, {
				...state.project!.content[pageIndex].sections[sectionIndex],
				id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
			});
		},
		removeSection: (
			state,
			action: PayloadAction<{ groupIndex?: number; pageIndex: number; sectionId: number }>,
		) => {
			const { pageIndex, sectionId } = action.payload;
			state.project!.content[pageIndex].sections = state.project!.content[
				pageIndex
			].sections.filter((section) => section.id !== sectionId);
		},
		reorderSection: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionId: number;
				type: 'up' | 'down';
			}>,
		) => {
			const { pageIndex, sectionId, type } = action.payload;
			const sectionIndex = state.project!.content[pageIndex].sections.findIndex(
				(section) => section.id === sectionId,
			);
			state.project!.content[pageIndex].sections = arrayMove(
				state.project!.content[pageIndex].sections,
				sectionIndex,
				type === 'up' ? sectionIndex - 1 : sectionIndex + 1,
			);
		},
		toggleSectionStatus: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionId: number;
				prop: 'hide' | 'locked';
			}>,
		) => {
			const { pageIndex, sectionId, prop } = action.payload;
			const sectionIndex = state.project!.content[pageIndex].sections.findIndex(
				(section) => section.id === sectionId,
			);
			state.project!.content[pageIndex].sections[sectionIndex][prop] =
				!state.project!.content[pageIndex].sections[sectionIndex][prop];
		},

		// Section Editor panel
		changeSectionBackground: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				value: string;
			}>,
		) => {
			const { pageIndex, sectionIndex, value } = action.payload;

			state.project!.content[pageIndex].sections[sectionIndex].background = value;
			if (!value.startsWith('http')) {
				const list = state.project!.content[pageIndex].sections[sectionIndex].elements.map((el) => {
					return { ...el, color: '' };
				});
				state.project!.content[pageIndex].sections[sectionIndex].elements = list;
			}
		},

		changeSectionLayout: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				value: string;
			}>,
		) => {
			const { pageIndex, sectionIndex, value } = action.payload;
			state.project!.content[pageIndex].sections[sectionIndex].layout = value;
		},

		changeElementProp: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				value: string | { type: 'section' | 'page'; id: number };
				// prop: 'content';
				prop: 'content' | 'paragraph' | 'heading' | 'src' | 'to' | 'class';
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, value, prop } = action.payload;
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex][prop] = value;
		},

		insertSectionBefore: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				before: number;
				section: Section;
			}>,
		) => {
			const { pageIndex, before, section } = action.payload;
			const beforeIdx = state.project!.content[pageIndex].sections.findIndex(
				(section) => section.id === before,
			);
			const array = state.project!.content[pageIndex].sections;
			array.splice(beforeIdx + 1, 0, {
				...section,
				id: Math.round(Math.random() * 10000),
			});
			state.project!.content[pageIndex].sections = array;
		},
		insertSection: (
			state,
			action: PayloadAction<{
				groupIndex: undefined | number;
				pageIndex: number;
				section: Section;
			}>,
		) => {
			const { pageIndex, section } = action.payload;
			state.project!.content[pageIndex].sections.push({
				...section,
				id: Math.round(Math.random() * 10000),
			});
		},
		insertPage: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				page: ContentItem;
			}>,
		) => {
			const { page } = action.payload;
			state.project!.content.push({
				...page,
				id: Math.round(Math.random() * 10000),
			});
		},
		removePage: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pid: number;
			}>,
		) => {
			const { pid } = action.payload;
			state.project!.content = state.project!.content.filter((page) => page.id !== pid);
		},
		changePageProp: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				prop: 'link' | 'behavior';
				value: string;
			}>,
		) => {
			const { pageIndex, prop, value } = action.payload;
			if (prop === 'behavior') {
				state.project!.content[pageIndex][prop] = value as PagesBehavior;
			} else {
				state.project!.content[pageIndex][prop] = value;
			}
		},

		// data visuals
		insertRow: (
			state,
			action: PayloadAction<{
				groupIndex: undefined | number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex } = action.payload;
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].data.push({
				color: '',
				a: 'title',
				b: 100,
				c: 0,
			});
		},
		changeCellContent: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				file: string;
				row: number;
				col: number | string;
				value: string;
			}>,
		) => {
			const {
				pageIndex,
				sectionIndex,
				elementIndex,
				file: fileName,
				row,
				col,
				value,
			} = action.payload;

			const indexFile = state.project!.content[pageIndex].sections[sectionIndex].elements[
				elementIndex
			].files?.findIndex((file: File) => file.name === fileName);
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].files[
				indexFile
			].value[row][col] = value;
		},

		changeColorRow: (
			state,
			action: PayloadAction<{
				groupIndex?: undefined;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				row: number;
				value: number;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, row, value } = action.payload;
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].data[
				row
			].color = value;
		},

		insertDataset: (
			state,
			action: PayloadAction<{
				groupIndex?: undefined;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				file: File;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, file } = action.payload;
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].files.push(
				file,
			);
		},
		removeDataset: (
			state,
			action: PayloadAction<{
				groupIndex?: undefined;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				fileName: string;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, fileName } = action.payload;

			const files = state.project!.content[pageIndex].sections[sectionIndex].elements[
				elementIndex
			].files.filter((file: File) => file.name !== fileName);
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].files = files;
		},
		insertScene: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				id: number;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, id } = action.payload;
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes?.push({
				// id: Date.now(),
				id: id,
				name: 'untitled',
				file: '',
				axis: {
					x: {
						value: '',
						type: 'linear',
						from: '',
						to: '',
						title: '',
					},
					y: { value: '', type: 'linear', from: '', to: '', title: '' },
				},
				// transform: { type: '', target: '', order: '' },
				// viewStyle: 'solid_line',
				viewStyle: '',
				color: 'white',
				markerShape: '',
				text: '',
				transforms: [],
			});
		},
		removeScene: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				sceneId: number;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, sceneId } = action.payload;
			const scenes = state.project!.content[pageIndex].sections[sectionIndex].elements[
				elementIndex
			].scenes?.filter((scene: Scene) => scene.id !== sceneId);
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes =
				scenes;
		},
		cloneScene: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				sceneId: number;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, sceneId } = action.payload;
			const sceneToClone = state.project!.content[pageIndex].sections[sectionIndex].elements[
				elementIndex
			].scenes?.find((scene: Scene) => scene.id === sceneId);
			// delete sceneToClone.initial;
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes?.push({
				id: Date.now(),
				name: sceneToClone?.name + '(copy)',
				file: sceneToClone?.file,
				axis: sceneToClone?.axis,
				viewStyle: sceneToClone?.viewStyle,
				color: sceneToClone?.color,
				markerShape: sceneToClone?.markerShape,
				text: sceneToClone?.text,
				transforms: sceneToClone?.transforms,
			});
		},
		replaceScene: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				sceneId: number;
				value: Scene;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, sceneId, value } = action.payload;
			const sceneIndex = state.project!.content[pageIndex].sections[sectionIndex].elements[
				elementIndex
			].scenes?.findIndex((scene: Scene) => scene.id === sceneId);
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes[
				sceneIndex
			] = value;
		},
		chnageSceneProps: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				sceneId: number;
				prop: 'selected' | 'file' | 'name' | 'viewStyle' | 'color' | 'markerShape' | 'text';
				selectedProp?: 'y1' | 'y2';
				value: string;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, sceneId, prop, selectedProp, value } =
				action.payload;

			const indexElement = state.project!.content[pageIndex].sections[
				sectionIndex
			].elements.findIndex((el) => el.id === elementIndex);
			const sceneIndex = state.project!.content[pageIndex].sections[sectionIndex].elements[
				indexElement
			].scenes.findIndex((scene: Scene) => scene.id === sceneId);
			if (prop === 'file') {
				const scene =
					state.project!.content[pageIndex].sections[sectionIndex].elements[indexElement].scenes[
						sceneIndex
					];
				state.project!.content[pageIndex].sections[sectionIndex].elements[indexElement].scenes[
					sceneIndex
				] = {
					...scene,
					axis: {
						x: {
							value: '',
							type: 'linear',
							from: '',
							to: '',
							title: '',
						},
						y: {
							value: '',
							type: 'linear',
							from: '',
							to: '',
							title: '',
						},
					},
					viewStyle: 'solid_line',
					color: 'white',
					markerShape: '',
					text: '',
					transforms: [],
					[prop]: value,
				};
				// } else if (prop === 'selected' && selectedProp) {
			} else if (prop === 'selected' && selectedProp) {
				state.project!.content[pageIndex].sections[sectionIndex].elements[indexElement].scenes[
					sceneIndex
				].selected[selectedProp] = value;
			} else {
				const scene =
					state.project!.content[pageIndex].sections[sectionIndex].elements[indexElement].scenes[
						sceneIndex
					];
				if (prop === 'viewStyle' && viewStyleOptions[value]) {
					state.project!.content[pageIndex].sections[sectionIndex].elements[indexElement].scenes[
						sceneIndex
					].selected = viewStyleOptions[value];
				}
				state.project!.content[pageIndex].sections[sectionIndex].elements[indexElement].scenes[
					sceneIndex
				][prop] = value;
			}
		},
		changeSceneAxis: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				sceneId: number;
				axis: 'x' | 'y';
				prop: 'value' | 'title' | 'from' | 'to' | 'type';
				value?: string;
				from?: number | string;
				to?: number | string;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, sceneId, axis, prop, value, from, to } =
				action.payload;

			const sceneIndex = state.project!.content[pageIndex].sections[sectionIndex].elements[
				elementIndex
			].scenes.findIndex((scene: Scene) => scene.id === sceneId);

			if (prop === 'value') {
				const axisObejct =
					state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes[
						sceneIndex
					].axis[axis];

				state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes[
					sceneIndex
				].axis[axis] = { ...axisObejct, value: value, from, to };
			} else {
				state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes[
					sceneIndex
				].axis[axis][prop] = value;
			}
		},
		insertTransform: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				sceneId: number;
				transform: Transform;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, sceneId, transform } = action.payload;

			const sceneIndex = state.project!.content[pageIndex].sections[sectionIndex].elements[
				elementIndex
			].scenes?.findIndex((scene: Scene) => scene.id === sceneId);

			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes?.[
				sceneIndex
			].transforms.push(transform);
		},

		editTransform: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				sceneId: number;
				transformIndex: number;
				prop: 'target' | 'operation' | 'value' | 'order';
				isPush?: boolean;
				valueIndex?: number;
				value: string | number;
			}>,
		) => {
			const {
				pageIndex,
				sectionIndex,
				elementIndex,
				sceneId,
				transformIndex,
				prop,
				value,
				isPush,
				valueIndex,
			} = action.payload;

			const sceneIndex = state.project!.content[pageIndex].sections[sectionIndex].elements[
				elementIndex
			].scenes?.findIndex((scene: Scene) => scene.id === sceneId);

			if (prop === 'operation') {
				const t =
					state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes?.[
						sceneIndex
					].transforms[transformIndex];
				state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes[
					sceneIndex
				].transforms[transformIndex] = {
					...t,
					operation: value,
					value: ['[]', '][', '()', ')(', '[)', '](', '(]', ')['].includes(value as string)
						? []
						: '',
				};
			}

			if (prop === 'target') {
				const t =
					state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes[
						sceneIndex
					].transforms[transformIndex];
				console.log(t.operation);
				state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes[
					sceneIndex
				].transforms[transformIndex] = {
					...t,
					[prop]: value,
					value: ['[]', '][', '()', ')(', '[)', '](', '(]', ')['].includes(t.operation) ? [] : '',
				};
				// } else if (isPush ) {
			} else if (isPush && valueIndex) {
				state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes[
					sceneIndex
				].transforms[transformIndex][prop][valueIndex] = value;
			} else {
				state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes[
					sceneIndex
				].transforms[transformIndex][prop] = value;
			}
		},
		removeTransform: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				sceneId: number;
				transformIdx: number;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, sceneId, transformIdx } = action.payload;
			const sceneIndex = state.project!.content[pageIndex].sections[sectionIndex].elements[
				elementIndex
			].scenes?.findIndex((scene: Scene) => scene.id === sceneId);

			const transforms = state.project!.content[pageIndex].sections[sectionIndex].elements[
				elementIndex
			].scenes?.[sceneIndex].transforms.splice(transformIdx, 1);

			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex].scenes[
				sceneIndex
			].transforms = transforms;
		},
		changeChartStructure: (
			state,
			action: PayloadAction<{
				groupIndex?: number;
				pageIndex: number;
				sectionIndex: number;
				elementIndex: number;
				prop: 'visual';
				value: string;
			}>,
		) => {
			const { pageIndex, sectionIndex, elementIndex, prop, value } = action.payload;
			state.project!.content[pageIndex].sections[sectionIndex].elements[elementIndex][prop] = value;
		},

		chnageFontConfig: (
			state,
			action: PayloadAction<{
				element: 'heading' | 'paragraph';
				value: string;
			}>,
		) => {
			const { element, value } = action.payload;

			state.project!.font_config[element] = value;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProject.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProject.fulfilled, (state, { payload }) => {
				state.project = payload;
				state.isLoading = false;
			})
			.addCase(getProject.rejected, (state) => {
				state.isLoading = false;
				state.error = 'not found';
			});
		builder
			.addCase(changeThemeProject.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(changeThemeProject.fulfilled, (state, { payload }) => {
				state.project!.themeId = payload.key;
				// state.project['custom_global_style'] = payload.extraCss;
				const resetedProject = state.project!.content.map((page) => {
					return {
						...page,
						sections: [
							...page.sections.map((section) => {
								return {
									...section,
									content: {
										elements: [
											...section.elements.map((el) => {
												return { ...el, class: '', color: '' };
											}),
										],
									},
								};
							}),
						],
					};
				});

				state.project!.content = resetedProject;
				state.isLoading = false;
			})
			.addCase(changeThemeProject.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const {
	// General
	chnageFontConfig,

	// Insert
	insertSection,
	insertPage,
	insertSectionBefore,

	// Page
	removePage,
	changePageProp,

	// Section
	changeSectionLayout,
	changeSectionBackground,
	toggleSectionStatus,
	cloneSection,
	removeSection,
	reorderSection,

	// Element
	changeElementProp,

	// Datavis
	changeChartStructure,

	// Scene
	insertScene,
	replaceScene,
	removeScene,
	cloneScene,
	chnageSceneProps,
	changeSceneAxis,

	// Table
	insertDataset,
	removeDataset,
	insertRow,
	changeCellContent,
	changeColorRow,

	// Transforms
	insertTransform,
	editTransform,
	removeTransform,
} = projectSlice.actions;

// export const projectSelector = (state: RootState) => state.projectReducer;
export default projectSlice.reducer;
