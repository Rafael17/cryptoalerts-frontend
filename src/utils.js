import Cookies from 'js-cookie';
import ls from 'local-storage';

const Util = {
	isLogin: () => {
		if (ls.get('userData')) {
			return true;
		}

		return false;
	}
}

export default Util;