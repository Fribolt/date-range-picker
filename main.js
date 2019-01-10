let selectedDate = null;
const selectDateRangeElement = document.querySelector('#static-date-range');
const fromDateSelect = document.querySelector('#from-date');
const fromDateElement = document.querySelector('#from');
const toDateSelect = document.querySelector('#to-date');
const toDateElement = document.querySelector('#to');
const dateNow = new Date();
const dateRangePeriod = {
    'custom': 0,
    'today': 0,
    'yesterday': 1,
    'last7Days': 7,
    'last30Days': 30,
    'last90Days': 90,
};
const formatDate = {
    forUser: {
        year: "numeric",
        month: "long",
        day: "numeric",
    },
    forValue: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    },
};
const setDateRange = (value) => {
    if (value === 'today') {
        setDateValue(fromDateSelect, dateArrayToString(dateNow));
        setDateValue(toDateSelect, dateArrayToString(dateNow));
    }
    setDateValue(fromDateSelect, dateArrayToString(selectedDate));
    setDateValue(toDateSelect, dateArrayToString(dateNow));
};
const dayToMilliseconds = days => days * 24 * 60 * 60 * 1000;
const formattingDate = (date, format) => date.toLocaleDateString('en-En', format);
const showSelectDate = (element, date) => {
    element.innerHTML = formattingDate(date, formatDate.forUser)
};
const showDateRange = (selectValue) => {
    selectedDate = new Date(dateNow - dayToMilliseconds(dateRangePeriod[selectValue]));
    showSelectDate(fromDateElement, selectedDate);
    showSelectDate(toDateElement, dateNow);
    setDateRange(selectValue);
};
const getDateArray = date => formattingDate(date, formatDate.forValue).split('/');
const getDateValue = element => element.value;
const changeDateArray = array => array.unshift(array.pop());
const dateArrayToString = array => {
    let dateArray = getDateArray(array);
    changeDateArray(dateArray);
    return dateArray.join('-');
};
const setDateValue = (element, value) => element.setAttribute('value', value);
const setSelectDate = (element, date, message) => {
    return element.innerHTML = date ? formattingDate(new Date(date), formatDate.forUser) : `${message} date`;
};

selectDateRangeElement.onchange = () => showDateRange(selectDateRangeElement.value);
fromDateSelect.onchange = () => setSelectDate(fromDateElement, getDateValue(fromDateSelect), 'From');
toDateSelect.onchange = () => setSelectDate(toDateElement, getDateValue(toDateSelect), 'To');