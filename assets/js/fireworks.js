let LOADING_POINT_TIMER = null;
let NEXT_YEAR_TIMER = null;
let NEXT_YEAR_TIME_YEAR = new Date().getFullYear();	// 年份
let NEXT_YEAR_TIME_MONTH = 2;	// 农历月份
let NEXT_YEAR_TIME_DAY = 10;	// 农历日
let NOW_TIME_TIMER = null;		// 农历时间

function setLoadingPoint() {
	const point = document.querySelector("#loading-init__point");
	LOADING_POINT_TIMER = setInterval(() => {
		if (point.textContent.length >= 3) {
			point.textContent = "";
		} else {
			point.textContent += '.';
		}
	}, 500);
}
setTimeout(() => setLoadingPoint(), 10);

function nextNewYearTime() {
	let newYear = new Date(
		NEXT_YEAR_TIME_YEAR,
		NEXT_YEAR_TIME_MONTH <= 0 ? 0 : NEXT_YEAR_TIME_MONTH - 1,
		NEXT_YEAR_TIME_DAY
	);

	newYear.setUTCFullYear(newYear.getFullYear() + 1);
	newYear.setMonth(0);
	newYear.setDate(1);
	newYear.setHours(0, 0, 0, 0);


	function pad(num) {
		return num.toString().padStart(2, '0');
	}

	function _getNewYearTime() {
		const now = new Date();
		const diff = newYear.getTime() - now.getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);

		// return `<div>
		//    	<span style="display: inline-block;font-size: 20px;margin-left: 5px;margin-bottom: 10px">倒计时</span><br>
		//    	<span style="display: inline-block;margin-left: 5px">距离农历乙巳<span style="background: linear-gradient(to left, #F44336, #FF9800);-webkit-background-clip: text;color: transparent;text-shadow: none;"> ${NEXT_YEAR_TIME_YEAR} </span>年春节还有</span><div style="font-size: 30px;text-align: center"><span style="font-size: 60%">${pad(days)}天</span>&nbsp;${pad(hours)}:${pad(minutes)}:${pad(seconds)}</div></div>`;
		return `<div>
           	<span style="display: inline-block;font-size: 20px;margin-left: 5px;margin-bottom: 10px">倒计时</span><br>
           	<span style="display: inline-block;margin-left: 5px">距离<span style="background: linear-gradient(to left, #F44336, #FF9800);-webkit-background-clip: text;color: transparent;text-shadow: none;"> ${NEXT_YEAR_TIME_YEAR + 1} </span>年还有</span><div style="font-size: 30px;text-align: center"><span style="font-size: 60%">${pad(days)}天</span>&nbsp;${pad(hours)}:${pad(minutes)}:${pad(seconds-1 === -1 ? '59' : seconds-1)}</div></div>`;
	}

	function _set() {
		const now = new Date();
		console.log("新年时间",newYear.getTime())
		const nextYearDOM = document.querySelector('#Next-Year-Time');
		// now.getTime() >= newYear.getTime()
		if (now.getTime() >= newYear.getTime()) {
			// 计算一天有多少毫秒
			if ((now.getTime() - newYear.getTime()) < 1000 * 60 * 60 * 24) {
				nextYearDOM.innerHTML = `
					<div style="width:100%;text-align:center;position: fixed;top: 25%;left: 50%;transform: translate(-50%, calc(-50% - 3px));">
						<div style=""><span style="background: linear-gradient(to left, #F44336, #FF9800);-webkit-background-clip: text;color: transparent;text-shadow: none;font-size:3rem">新年快乐，巳巳如意！</div>
						<div style="margin-top: 30px;animation: fade-in 0.5s linear;"><span style="background: linear-gradient(to left, #F44336, #FF9800);-webkit-background-clip: text;color: transparent;text-shadow: none;font-size:1.5em">梦虽遥，追则能达；愿虽艰，持则可圆。</div>
						<div style="margin-top: 10px;"><span style="background: linear-gradient(to left, #F44336, #FF9800);-webkit-background-clip: text;color: transparent;text-shadow: none;font-size:1.5em">河山添锦绣，星光映万家！</div>
					</div>
					`;
			} else {
				const lunar = calendar.lunar2solar(now.getFullYear(), 1, 1);
				newYear = new Date(
					lunar.cYear,
					lunar.cMonth,
					lunar.cDay
				);
				NEXT_YEAR_TIME_YEAR = lunar.cYear;
				NEXT_YEAR_TIME_MONTH = lunar.cMonth;
				NEXT_YEAR_TIME_DAY = lunar.cDay;
				nextYearDOM.innerHTML = _getNewYearTime();
			}
		} else {
			nextYearDOM.innerHTML = _getNewYearTime();
		}
	}
	_set();

	NEXT_YEAR_TIMER = setInterval(() => _set(), 1000);
}
setTimeout(() => nextNewYearTime(), 0);

function nowTime() {
	function pad(num) {
		return num.toString().padStart(2, '0');
	}

	function _getMonthFullName(month) {
		const monthFullName = [
			'01', '02', '03', '04',
			'05', '06', '07', '08',
			'09', '10', '11', '12'
		];
		return monthFullName[month];
	}

	function _getWeekFullName(week) {
		const weekFullName = [
			'日', '一', '二', '三', '四', '五', '六'
		];
		return weekFullName[week];
	}

	function _set() {
		// console.log("nowTime",new Date().getSeconds())
		const now = new Date();
		const timeDom = document.querySelector('#Now-Time .time');
		const dateDom = document.querySelector('#Now-Time .date');
		timeDom.innerHTML = `${pad(now.getHours())} : ${pad(now.getMinutes())}<span> : ${pad(now.getSeconds() + 2 === 60 ? '00' : now.getSeconds() + 2 === 61 ? '01' : now.getSeconds() + 2)}</span>`;
		dateDom.textContent = `${now.getFullYear()}年${_getMonthFullName(now.getMonth())}月${pad(now.getDate())}日 , 星期${_getWeekFullName(now.getDay())} `;
	}
	_set();

	NOW_TIME_TIMER = setInterval(() => _set(), 1000);
}
nowTime()
// setTimeout(() => nowTime(), 0);

function setBottomRightButton(toggleMenu) {
	document.querySelector("#right-bottom-button .parent-button").addEventListener("click", toggleMenu);
}
