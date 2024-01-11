// content.js
console.log("content.js loaded outside");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'scrape_week') {
        const weekEventsData = scrapePageForEvents();
        sendResponse({ weekEventsData: weekEventsData });
    } else if (request.action === 'get_next_url') {
        const nextUrl = getNextURL();
        sendResponse({ nextUrl: nextUrl });
    }
});

function scrapePageForEvents() {
    const week_events = [];
    const overlap_counter = [0, 0, 0, 0, 0, 0, 0];
    let tbody_index = 2;

    if (document.querySelector("table#tabhorarionew").querySelectorAll("tbody")[2] == undefined) {
        tbody_index = 1;
    }
    [...document.querySelector("table#tabhorarionew").querySelectorAll("tbody")[tbody_index].querySelectorAll("tr")].forEach((row, index) => {
        weekday_counter = 0;
        row.querySelectorAll(".cellborder").forEach((column, index) => {
            while (overlap_counter[weekday_counter] > 0 || weekday_counter > overlap_counter.length) {
                weekday_counter = weekday_counter + 1;
            }
            if (column.querySelector('[name=descriptionDiv]').textContent.trim() !== "") {
                overlap_counter[weekday_counter] = overlap_counter[weekday_counter] + column.getAttribute("rowspan");
                // add event to response object
                week_events.push({
                    course: extractCourseName(column),
                    shift: extractShift(column),
                    classroom: extractClassrom(column),
                    start: extractStartTime(row, weekday_counter),
                    end: extractEndTime(row, weekday_counter, column.getAttribute("rowspan"))
                });
            }
            weekday_counter = weekday_counter + 1;
        })
        for (let i = 0; i < overlap_counter.length; i++) {
            if (overlap_counter[i] > 0) {
                overlap_counter[i] = overlap_counter[i] - 1;
            }
        }
    })
    return week_events
}

function extractCourseName(column) {
    return column.querySelector('[name=descriptionDiv]').innerHTML.split('<br>')[0].trim();
}

function extractClassrom(column) {
    return column.querySelector('[name=descriptionDiv]').innerHTML.split('<br>')[1].split('-')[0].trim();
}

function extractShift(column) {
    return column.querySelector('[name=descriptionDiv]').innerHTML.split('<br>')[1].split('-')[1].trim();
}

function extractStartTime(row, weekday_counter) {
    let { day, month, year, hour, minutes } = getTime(row, weekday_counter);
    return new Date(year, month - 1, day, hour, minutes);
}

function extractEndTime(row, weekday_counter, rowspan) {
    let { day, month, year, hour, minutes } = getTime(row, weekday_counter);
    if (rowspan > 1) {
        minutes = (parseInt(minutes) + (rowspan * 30)).toString();
        hour = (parseInt(hour) + parseInt(minutes / 60)).toString();
        minutes = (minutes % 60).toString().padStart(2, '0');
    }
    return new Date(year, month - 1, day, hour, minutes);
}

function getTime(row, weekday_counter) {
    let day = parseInt(document.querySelector(".days").querySelectorAll("th")[weekday_counter + 1].textContent.split(' ').pop().split('-')[0]);
    let month = parseInt(document.querySelector(".days").querySelectorAll("th")[weekday_counter + 1].textContent.split(' ').pop().split('-')[1]);
    let year = parseInt(document.querySelector(".formitemlist").innerText.split('-')[0]);
    if (month < 8) {
        year = year + 1;
    }
    let hour = parseInt(row.querySelector("th.time").textContent.split('\n').pop().split('h')[0]);
    let minutes = parseInt(row.querySelector("th.time").textContent.split('\n').pop().split('h')[1]);
    return { day, month, year, hour, minutes };
}

function getNextURL() {
    if (document.querySelector(".semanaseguinte") == null) {
        return null;
    }
    dateToShow = document.querySelector(".semanaseguinte").querySelector('a').getAttribute("onclick").split("'")[1];
    var extraParams = '';
    console.log("next week is: " + dateToShow);
    try {
        extraParams = otherTimeTableParams();
    } catch (err) {
        extraParams = '';
    }

    return "https://netpa.novasbe.pt/netpa/DIFTasks?_PR_=1&_AP_=11&_MD_=1&_SR_=166&_ST_=1&dtInicial=" + dateToShow + "&" + extraParams;
}
