const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']

function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate()
}
//Sunday is 0, Saturday is 6
//dt = new Date(); dt.getDay() to get number of day
//January is 0

function killChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
var IdidntKnowAboutThisFuc__ngPatternYesterday = (function () {
    function Calendar(renderId) {
        this.year = 2000
        this.month = 1
        this.day = 1
        this.checked = null
        this.output = null
        this.monthOut = null
        this.yearOut = null

        this.reset = function () {
            var today = new Date()
            this.year = today.getFullYear()
            this.month = today.getMonth()
            if (this.output)
                this.output.innerText = 'Select the Date'
        }

        this.monthUp = function () {
            this.month += 1
        }

        this.yearUp = function () {
            this.year += 1
        }

        this.monthDown = function () {
            this.month -= 1
        }

        this.yearDown = function () {
            this.year -= 1
        }

        this.init = function () {
            var render = document.getElementById(renderId)
            killChildren(render)
            this.createControllers(render)
            this.createTable(render)

            this.reset()
            this.render()
        }

        this.createControllers = function (render) {
            this.output = document.createElement('div')
            this.output.classList.add('calendar-label')
            render.appendChild(this.output)
            this.output.style.width = "100%"

            var row = document.createElement('div')
            row.classList.add('calendar-input-row')
            render.appendChild(row)
            this.yearOut = document.createElement('div')
            this.createButton(row, '<', this.yearDown, 'calendar-controller', 'left')
            this.yearOut.classList.add('left')
            this.yearOut.classList.add('calendar-label')
            row.appendChild(this.yearOut)
            this.createButton(row, '>', this.yearUp, 'calendar-controller', 'right')

            var row = document.createElement('div')
            row.classList.add('calendar-input-row')
            render.appendChild(row)
            this.monthOut = document.createElement('div')
            this.createButton(row, '<', this.monthDown, 'calendar-controller', 'left')
            this.monthOut.classList.add('left')
            this.monthOut.classList.add('calendar-label')
            row.appendChild(this.monthOut)
            this.createButton(row, '>', this.monthUp, 'calendar-controller', 'right')

            var row = document.createElement('div')
            row.classList.add('calendar-input-row')
            render.appendChild(row)
            this.createButton(row, 'Reset', this.reset, 'calendar-controller')
        }

        this.createButton = function (render, text, callback, buttonClass, float) {
            var button = document.createElement('div')
            button.innerText = text
            var ctx = this
            button.onclick = function () {
                callback.apply(ctx)
                ctx.render()
            }
            if (buttonClass) {
                button.classList.add(buttonClass)
                if (float) {
                    button.classList.add(float)
                }
            }

            render.appendChild(button)

            return button
        }

        this.createTable = function (render) {
            this.createHeader(render)
            var table = document.createElement('div')
            table.classList.add('calendar-table')
            render.appendChild(table)

            return table
        }

        this.createHeader = function (render) {
            var row = document.createElement('div')
            row.classList.add('calendar-header-row')
            render.appendChild(row)

            this.createHeaderCard(row, 'Mon')
            this.createHeaderCard(row, 'Tue')
            this.createHeaderCard(row, 'Wed')
            this.createHeaderCard(row, "Thu")
            this.createHeaderCard(row, 'Fri')
            this.createHeaderCard(row, 'Sat')
            this.createHeaderCard(row, 'Sun')
        }

        this.createHeaderCard = function (row, text) {
            var card = document.createElement('div')
            card.classList.add('calendar-header-card')
            card.innerText = text
            row.appendChild(card)

            return card
        }

        this.render = function () {
            this.checked = null
            var table = document.querySelector('#' + renderId + ' .calendar-table')
            killChildren(table)
            var days = daysInMonth(this.month, this.year)
            var date = new Date(this.year, this.month, 1)
            var nDate = date.getDay()

            if (nDate == 0) {
                nDate = 7
            }
            var row = this.spawnRow(table)
            for (var i = 1; i < nDate; i++) {
                this.spawnCard(row)
            }
            var spawned = 0
            for (var i = nDate; i <= 7; i++ , spawned++) {
                this.spawnCard(row, spawned + 1)
            }
            // first row is filled
            // filling other rows
            var rowsLeft = this.countRowsLeft(days, spawned)
            for (var j = 0; j < rowsLeft; j++) {
                row = this.spawnRow(table)
                for (var i = 0; i < 7; i++) {
                    spawned += 1
                    this.spawnCard(row, (spawned <= days) ? spawned : 0)
                }
            }

            if (this.monthOut)
                this.monthOut.innerText = this.formMonth()

            if (this.yearOut)
                this.yearOut.innerText = this.formYear()
        }

        this.formMonth = function () {
            return Months[new Date(this.year, this.month).getMonth()]
        }

        this.formYear = function () {
            return new Date(this.year, this.month).getFullYear()
        }

        this.click = function (elem) {
            if (elem.classList.contains('empty'))
                return

            if (this.checked) {
                this.checked.classList.remove('card-checked')
            }
            elem.classList.add('card-checked')
            this.checked = elem
            this.day = parseInt(elem.innerText)

            this.output.innerText = this.formDate()
        }

        this.formDate = function () {
            return new Date(this.year, this.month, this.day).toDateString()
        }

        this.countRowsLeft = function (days, spawned) {
            var delta = days - spawned
            var rowsLeft = Math.floor(delta / 7)
            if (rowsLeft * 7 < delta) {
                rowsLeft += 1
            }

            return rowsLeft
        }

        this.spawnRow = function (table) {
            var row = document.createElement('div')
            row.classList.add('calendar-row')
            table.appendChild(row)

            return row
        }

        this.spawnCard = function (row, day) {
            var card = document.createElement('div')
            card.classList.add('calendar-card')
            card.onclick = () => {
                this.click(card)
            }
            day ? card.innerText = day : card.classList.add('empty')
            row.appendChild(card)

            return card
        }

        this.init()
    }

    return {
        createCalendar: function (id) {
            new Calendar(id)
        }
    }
}())

var lastId = 0
document.querySelectorAll('.calendar').forEach(cal => {
    cal.id = 'calendar-' + lastId
    lastId += 1
    IdidntKnowAboutThisFuc__ngPatternYesterday.createCalendar(cal.id)
})
