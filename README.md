# Inro: BRD Project

`Brd` is the most simple web builder because, at the beginning, we recommend that you answer some questions to help you get the perfect template for you.

And you can choose any section from the library, and you can replace the selected theme with another.

**Data visualization** is one of our most important goals because we provide the perfect tool to customize your chart.
You can choose and replace between many charts, upload or link your data, separate the cycle of a chart into many scenes, and be controlled by two different types of actions.

## Getting Started with scripts of the poject

`npm run start`

Runs the app in the development mode in [http://localhost:3000](http://localhost:3000).

`npm run test`

Launches the test runner in the interactive watch mode.

`npm run build`

Builds the app for production to the `build` folder.

`npm run serve-project`

Runs a fake project in [http://localhost:8000](http://localhost:8000).

`npm run serve-mode1`

Runs a simple stylesheet to be a theme in [http://localhost:8500](http://localhost:8500).

## Content Of the project

1. Main routes/pages of the project

   - **/dashboard**:
     there is a list of user projects and their settings.

   - **/edit**:
     main panels:

     - Top panel: main header with some settings like preview and publish and
       collaborators and invite button in the right side of the header, insert dropdown for insert `section` or `page` or `group`, and switch themes dropdown and back to dashboard in the left side of the header, and user project name in the middle of the header.

     - left panel:
       there are two view panels. The first is user project content like pages and sections of page, and the second is inserting new content like `page` or `group` or `section` and filtering between him.

     - right panel:
       the main functionality is editing section elements and there are many components for each element because each element has different settings.

     - board panel:
       here is all of the project content live with some settings in the section frame **Component**.

   - **/preview**: specifically user template without any editor components.

## Technologies used in the project

### packeges

- Styling:

  - tailwind css : used in the panels of the project.

- State management:

  - redux toolkit:

- 2D Visuals | Charts:

  - d3:
  - visx:

- 3D:

  - react-three/fiber:

- Table:

  - handsontable:

- Router:

  - react-router:

- Icons:
  - react-icons:

## Todos

- Multiple views in **Visual** element.
- Group of pages > to switch between pages by navigation.
- Collaboration system between users with permissions and roles.
- Sepatred react-app to publish **NPM** package with all renders `Components` as JSX.
- Use **Chatgpt** to choose a section from the library and generate content of elements like text and images based on a prompt like input or his previous answers.
- Separate next-app for deploying user templates and use a `pre-rendering` process like **SSR** or **SSG** or **[framer Technique](https://www.framer.com/learn/pre-rendering/)**.
