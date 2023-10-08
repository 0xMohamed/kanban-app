export const setCookie = (cookie: { cName: string; cValue: string }, exDays: number) => {
	const { cName, cValue } = cookie;
	const d = new Date();
	d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
	const expires = 'expires=' + d.toUTCString();
	document.cookie = cName + '=' + cValue + ';' + expires + ';path=/';
};

export const getCookie = (cName: string) => {
	const name = cName + '=';
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
};

export const deleteCookie = (cName: string) => {
	setCookie({ cName, cValue: '' }, -1);
};

export const checkCookie = (cName: string) => {
	const cookie = getCookie(cName);
	if (cookie !== undefined && cookie !== '' && cookie !== null) {
		return true;
	} else {
		return false;
	}
};
