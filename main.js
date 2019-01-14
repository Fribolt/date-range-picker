let selectedDate = null;
const selectDateRangeElement = document.querySelector('#static-date-range');
const datePeriodElement = document.querySelector('.date-period');
const fromDateSelect = document.querySelector('#from-date');
const toDateSelect = document.querySelector('#to-date');
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

const setDateRange = () => {
    fromDateSelect.value = dateArrayToString(selectedDate);
    toDateSelect.value = dateArrayToString(dateNow);
};

const setSelectedDate = datePeriod => selectedDate = new Date(dateNow - dayToMilliseconds(datePeriod));

const setDiapason = () => {
    setAttribute(fromDateSelect, 'max', getDateValue(toDateSelect));
    setAttribute(toDateSelect, 'min', getDateValue(fromDateSelect));
};

const dayToMilliseconds = days => days * 24 * 60 * 60 * 1000;

const formattingDate = (date, format) => date.toLocaleDateString('en-En', format);

const showSelectedDate = () => {
    const from = setDate(getDateValue(fromDateSelect), 'From');
    const to = setDate(getDateValue(toDateSelect), 'To');

    datePeriodElement.innerText = `${setSelectedDateFrom(from)} - ${setSelectedDateTo(to)}`;
};

const setSelectedDateFrom = from => from !== `From date` ? formattingDate(from, formatDate.forUser) : from;
const setSelectedDateTo = to => to !== 'To date' ? formattingDate(to, formatDate.forUser) : to;

const showDateRange = (value) => {
    setSelectedDate(dateRangePeriod[value]);
    setDateRange();
    setDiapason();
    showSelectedDate(selectedDate, dateNow);
};

const getDateArray = date => formattingDate(date, formatDate.forValue).split('/');
const getDateValue = element => element.value;
const changeDateArray = array => array.unshift(array.pop());

const dateArrayToString = array => {
    let dateArray = getDateArray(array);
    changeDateArray(dateArray);
    return dateArray.join('-');
};

const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

const setDate = (date, message) => date ? new Date(date) : `${message} date`;

const updateInputs = () => {
    showSelectedDate();
    selectDateRangeElement.value = 'custom';
    setDiapason();
};

selectDateRangeElement.onchange = () => showDateRange(selectDateRangeElement.value);
fromDateSelect.onchange = () => updateInputs();
toDateSelect.onchange = () => updateInputs();