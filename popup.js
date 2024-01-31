/* ics.js */
var saveAs = saveAs || function (e) { "use strict"; if (typeof e === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) { return } var t = e.document, n = function () { return e.URL || e.webkitURL || e }, r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"), o = "download" in r, a = function (e) { var t = new MouseEvent("click"); e.dispatchEvent(t) }, i = /constructor/i.test(e.HTMLElement) || e.safari, f = /CriOS\/[\d]+/.test(navigator.userAgent), u = function (t) { (e.setImmediate || e.setTimeout)(function () { throw t }, 0) }, s = "application/octet-stream", d = 1e3 * 40, c = function (e) { var t = function () { if (typeof e === "string") { n().revokeObjectURL(e) } else { e.remove() } }; setTimeout(t, d) }, l = function (e, t, n) { t = [].concat(t); var r = t.length; while (r--) { var o = e["on" + t[r]]; if (typeof o === "function") { try { o.call(e, n || e) } catch (a) { u(a) } } } }, p = function (e) { if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)) { return new Blob([String.fromCharCode(65279), e], { type: e.type }) } return e }, v = function (t, u, d) { if (!d) { t = p(t) } var v = this, w = t.type, m = w === s, y, h = function () { l(v, "writestart progress write writeend".split(" ")) }, S = function () { if ((f || m && i) && e.FileReader) { var r = new FileReader; r.onloadend = function () { var t = f ? r.result : r.result.replace(/^data:[^;]*;/, "data:attachment/file;"); var n = e.open(t, "_blank"); if (!n) e.location.href = t; t = undefined; v.readyState = v.DONE; h() }; r.readAsDataURL(t); v.readyState = v.INIT; return } if (!y) { y = n().createObjectURL(t) } if (m) { e.location.href = y } else { var o = e.open(y, "_blank"); if (!o) { e.location.href = y } } v.readyState = v.DONE; h(); c(y) }; v.readyState = v.INIT; if (o) { y = n().createObjectURL(t); setTimeout(function () { r.href = y; r.download = u; a(r); h(); c(y); v.readyState = v.DONE }); return } S() }, w = v.prototype, m = function (e, t, n) { return new v(e, t || e.name || "download", n) }; if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) { return function (e, t, n) { t = t || e.name || "download"; if (!n) { e = p(e) } return navigator.msSaveOrOpenBlob(e, t) } } w.abort = function () { }; w.readyState = w.INIT = 0; w.WRITING = 1; w.DONE = 2; w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null; return m }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content); if (typeof module !== "undefined" && module.exports) { module.exports.saveAs = saveAs } else if (typeof define !== "undefined" && define !== null && define.amd !== null) { define("FileSaver.js", function () { return saveAs }) }
var ics = function (e, t) { "use strict"; if (navigator.userAgent.indexOf("MSIE") > -1 && -1 == navigator.userAgent.indexOf("MSIE 10")) { console.log("Unsupported Browser"); return } void 0 === e && (e = "default"), void 0 === t && (t = "Calendar"); var r = -1 !== navigator.appVersion.indexOf("Win") ? "\r\n" : "\n", n = [], i = ["BEGIN:VCALENDAR", "PRODID:" + t, "VERSION:2.0"].join(r), o = r + "END:VCALENDAR", l = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]; return { events: function () { return n }, calendar: function () { return i + r + n.join(r) + o }, addEvent: function (t, i, o, u, a, $, c) { if (void 0 === t || void 0 === i || void 0 === o || void 0 === u || void 0 === a) return !1; if (c && !c.rrule) { if ("YEARLY" !== c.freq && "MONTHLY" !== c.freq && "WEEKLY" !== c.freq && "DAILY" !== c.freq) throw "Recurrence rrule frequency must be provided and be one of the following: 'YEARLY', 'MONTHLY', 'WEEKLY', or 'DAILY'"; if (c.until && isNaN(Date.parse(c.until))) throw "Recurrence rrule 'until' must be a valid date string"; if (c.interval && isNaN(parseInt(c.interval))) throw "Recurrence rrule 'interval' must be an integer"; if (c.count && isNaN(parseInt(c.count))) throw "Recurrence rrule 'count' must be an integer"; if (void 0 !== c.byday) { if ("[object Array]" !== Object.prototype.toString.call(c.byday)) throw "Recurrence rrule 'byday' must be an array"; if (c.byday.length > 7) throw "Recurrence rrule 'byday' array must not be longer than the 7 days in a week"; for (var g in c.byday = c.byday.filter(function (e, t) { return c.byday.indexOf(e) == t }), c.byday) if (0 > l.indexOf(c.byday[g])) throw "Recurrence rrule 'byday' values must include only the following: 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'" } } var s, d = new Date(u), f = new Date(a), S = new Date, E = ("0000" + d.getFullYear().toString()).slice(-4), y = ("00" + (d.getMonth() + 1).toString()).slice(-2), A = ("00" + d.getDate().toString()).slice(-2), T = ("00" + d.getHours().toString()).slice(-2), v = ("00" + d.getMinutes().toString()).slice(-2), b = ("00" + d.getSeconds().toString()).slice(-2), h = ("0000" + f.getFullYear().toString()).slice(-4), R = ("00" + (f.getMonth() + 1).toString()).slice(-2), D = ("00" + f.getDate().toString()).slice(-2), N = ("00" + f.getHours().toString()).slice(-2), I = ("00" + f.getMinutes().toString()).slice(-2), w = ("00" + f.getSeconds().toString()).slice(-2), M = ("0000" + S.getFullYear().toString()).slice(-4), O = ("00" + (S.getMonth() + 1).toString()).slice(-2), L = ("00" + S.getDate().toString()).slice(-2), Y = ("00" + S.getHours().toString()).slice(-2), p = ("00" + S.getMinutes().toString()).slice(-2), U = ("00" + S.getSeconds().toString()).slice(-2), _ = "", V = ""; T + v + b + N + I + w != 0 && (_ = "T" + T + v + b, V = "T" + N + I + w); var x = E + y + A + _, j = h + R + D + V; if (c) { if (c.rrule) s = c.rrule; else { if (s = "rrule:FREQ=" + c.freq, c.until) { var m = new Date(Date.parse(c.until)).toISOString(); s += ";UNTIL=" + m.substring(0, m.length - 13).replace(/[-]/g, "") + "000000Z" } c.interval && (s += ";INTERVAL=" + c.interval), c.count && (s += ";COUNT=" + c.count), c.byday && c.byday.length > 0 && (s += ";BYDAY=" + c.byday.join(",")) } } new Date().toISOString(); var C = ["BEGIN:VEVENT", "UID:" + n.length + "@" + e, "DESCRIPTION:" + i, "DTSTAMP;VALUE=DATE-TIME:" + (M + O + L + ("T" + Y)) + p + U, "DTSTART;VALUE=DATE-TIME:" + x, "DTEND;VALUE=DATE-TIME:" + j, "LOCATION:" + o, "SUMMARY;LANGUAGE=en-us:" + t, "TRANSP:" + ($ ? "OPAQUE" : "TRANSPARENT"), "END:VEVENT"]; return s && C.splice(4, 0, s), C = C.join(r), n.push(C), C }, download: function (e, t) { if (n.length < 1) return !1; t = void 0 !== t ? t : ".ics", e = void 0 !== e ? e : "calendar"; var l, u = i + r + n.join(r) + o; if (-1 === navigator.userAgent.indexOf("MSIE 10")) l = new Blob([u]); else { var a = new BlobBuilder; a.append(u), l = a.getBlob("text/x-vCalendar;charset=" + document.characterSet) } return saveAs(l, e + t), u }, build: function () { return !(n.length < 1) && i + r + n.join(r) + o } } };

// popup.js
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('runScript').addEventListener('click', function () {
        // Initialize or reset scraping state
        const cal = ics();
        let currentTabId;

        const markAsBusy = document.getElementById('busyCheckbox').checked;
        hideButton();

        // Start scraping weeks
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            currentTabId = tabs[0].id;
            scrapeWeek()
                .then((eventCount) => {
                    if (eventCount > 0) {
                        cal.download("netpa_calendar", ".ics");
                        // Show a success message after a delay
                        successMessage();
                        setTimeout(openTab, 4000, "https://2ly.link/1vrZP");
                    } else {
                        // Show a message indicating no events to download
                        noEventsMessage();
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // Show an error message (you can customize this part)
                    errorMessage();
                });
        });

        function scrapeWeek() {
            return new Promise((resolve, reject) => {
                // Send message to content script to scrape week
                chrome.tabs.sendMessage(currentTabId, { action: 'scrape_week' }, function (response) {
                    // Extract week events from response
                    const weekEvents = response && response.weekEventsData;
                    // Add week events to calendar
                    let weekEventCount = 0;
                    if (weekEvents) {
                        for (const weekEvent of weekEvents) {
                            cal.addEvent(weekEvent.course, weekEvent.course, weekEvent.classroom, weekEvent.start, weekEvent.end, markAsBusy);
                            weekEventCount++;
                        }
                    }
                    // Get the next URL and navigate
                    updateTabAndScrape().then((nextWeekEventCount) => {
                        resolve(weekEventCount + nextWeekEventCount);
                    }).catch((error) => {
                        console.error("Error:", error);
                        reject(error);
                    });
                });
            });
        }

        function updateTabAndScrape() {
            return new Promise((resolve, reject) => {
                // Send message to content script to get next URL
                chrome.tabs.sendMessage(currentTabId, { action: 'get_next_url' }, function (response) {
                    // Extract next URL from response
                    const nextUrl = response && response.nextUrl;
                    // Update tab and scrape week if there is a next URL
                    if (nextUrl) {
                        chrome.tabs.update(currentTabId, { url: nextUrl }, function () {
                            // Wait for the tab to be updated, then resolve the promise
                            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                                // If the tab is updated, resolve the promise
                                if (changeInfo.status === 'complete') {
                                    chrome.tabs.onUpdated.removeListener(listener);
                                    scrapeWeek().then((eventCount) => {
                                        resolve(eventCount);
                                    }).catch((error) => {
                                        console.error("Error:", error);
                                        reject(error);
                                    });
                                }
                            });
                        });
                    } else {
                        resolve(0);  // Resolve even if there are no more weeks
                    }
                });
            });
        }

        function openTab(url) {
            // Open a new tab with the Instagram page
            chrome.tabs.create({ url: url }, function (tab) {
                console.log('Tab opened:', tab);

                // Send a message to the background script indicating that the Instagram tab is open
                chrome.runtime.sendMessage({ action: 'tabOpen', tabId: tab.id });
            });
        }

        function successMessage() {
            document.getElementById('conclusion').innerText = 'Export completed! Check your downloads folder for the file.\nFollow us on Instagram @techclubatnova!';
            document.getElementById('conclusion').style.display = 'block';
            showButton();
        }

        function noEventsMessage() {
            document.getElementById('conclusion').innerText = 'No events found to export.';
            document.getElementById('conclusion').style.display = 'block';
            showButton();
        }

        function errorMessage() {
            document.getElementById('conclusion').innerText = 'An error occurred. Please try again.';
            document.getElementById('conclusion').style.display = 'block';
        }

        function hideButton() {
            document.getElementById('runScript').style.display = 'none';
            document.getElementById('busyCheckbox').style.display = 'none';
            document.getElementById('loading').style.display = 'block';
        }

        function showButton() {
            document.getElementById('runScript').style.display = 'block';
            document.getElementById('busyCheckbox').style.display = 'block';
            document.getElementById('loading').style.display = 'none';
        }
    });
});