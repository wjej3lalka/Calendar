document.addEventListener('DOMContentLoaded', function() {
    
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    
    
    const monthYearElement = document.getElementById('current-month');
    const daysContainer = document.getElementById('calendar-days');
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');
    
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    
    const holidays = [
        { day: 1, month: 0, name: 'Новый год' },        // 1 января
        { day: 7, month: 0, name: 'Рождество' },        // 7 января
        { day: 23, month: 1, name: 'День защитника' },  // 23 февраля
        { day: 8, month: 2, name: 'Женский день' },     // 8 марта
        { day: 1, month: 4, name: 'День труда' },       // 1 мая
        { day: 9, month: 4, name: 'День Победы' },      // 9 мая
        { day: 12, month: 5, name: 'День России' },     // 12 июня
        { day: 4, month: 10, name: 'День единства' },   // 4 ноября
        { day: 31, month: 11, name: 'Новый год' }       // 31 декабря
    ];
    
    
    function updateCalendar() {
        monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;
        
        
        daysContainer.innerHTML = '';
        
        
        const firstDay = new Date(currentYear, currentMonth, 1);
      
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        let firstDayWeekday = firstDay.getDay();
        
        if (firstDayWeekday === 0) firstDayWeekday = 7;
        
        
        for (let i = 1; i < firstDayWeekday; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty');
            daysContainer.appendChild(emptyDay);
        }
        
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            const date = new Date(currentYear, currentMonth, day);
            const weekday = date.getDay(); // 0 - воскресенье, 6 - суббота
            
            dayElement.classList.add('day');
            
            const today = new Date();
            if (date.getDate() === today.getDate() && 
                date.getMonth() === today.getMonth() && 
                date.getFullYear() === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            if (weekday === 6 || weekday === 0) {
                dayElement.classList.add('weekend-day');
            }
            
            const isHoliday = holidays.find(h => 
                h.day === day && h.month === currentMonth
            );
            
            if (isHoliday) {
                dayElement.classList.add('holiday');
            }
            
            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);
            
            if (isHoliday) {
                const event = document.createElement('div');
                event.classList.add('day-event');
                event.textContent = isHoliday.name;
                dayElement.appendChild(event);
            }
            
            daysContainer.appendChild(dayElement);
        }
    }
    
    prevButton.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });
    
    nextButton.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });
    
    
    updateCalendar();
});
