const timeZones = [
    { offset: '-12:00', abbrev: 'UTC-12', location: 'Baker Island, Howland Island', x: 15, y: 45 },
    { offset: '-11:00', abbrev: 'SST', location: 'Pago Pago, American Samoa', x: 8, y: 55 },
    { offset: '-10:00', abbrev: 'HST', location: 'Honolulu, Hawaii', x: 18, y: 48 },
    { offset: '-09:30', abbrev: 'MART', location: 'Marquesas Islands', x: 14, y: 53 },
    { offset: '-09:00', abbrev: 'AKST', location: 'Anchorage, Alaska', x: 16, y: 33 },
    { offset: '-08:00', abbrev: 'PST', location: 'Los Angeles, USA', x: 20, y: 43 },
    { offset: '-07:00', abbrev: 'MST', location: 'Phoenix, USA', x: 23, y: 45 },
    { offset: '-06:00', abbrev: 'CST', location: 'Chicago, USA', x: 27, y: 42 },
    { offset: '-05:00', abbrev: 'EST', location: 'New York, USA', x: 30, y: 42 },
    { offset: '-04:00', abbrev: 'AST', location: 'Halifax, Canada', x: 32, y: 39 },
    { offset: '-03:30', abbrev: 'NST', location: 'St. John\'s, Canada', x: 34, y: 38 },
    { offset: '-03:00', abbrev: 'ART', location: 'Buenos Aires, Argentina', x: 32, y: 65 },
    { offset: '-02:00', abbrev: 'FNT', location: 'Fernando de Noronha', x: 37, y: 58 },
    { offset: '-01:00', abbrev: 'CVT', location: 'Cape Verde', x: 42, y: 50 },
    { offset: '+00:00', abbrev: 'GMT', location: 'London, UK', x: 48, y: 39 },
    { offset: '+01:00', abbrev: 'CET', location: 'Paris, France', x: 49, y: 40 },
    { offset: '+02:00', abbrev: 'EET', location: 'Athens, Greece', x: 52, y: 43 },
    { offset: '+03:00', abbrev: 'MSK', location: 'Moscow, Russia', x: 56, y: 35 },
    { offset: '+03:30', abbrev: 'IRST', location: 'Tehran, Iran', x: 57, y: 45 },
    { offset: '+04:00', abbrev: 'GST', location: 'Dubai, UAE', x: 59, y: 48 },
    { offset: '+04:30', abbrev: 'AFT', location: 'Kabul, Afghanistan', x: 60, y: 43 },
    { offset: '+05:00', abbrev: 'PKT', location: 'Karachi, Pakistan', x: 62, y: 47 },
    { offset: '+05:30', abbrev: 'IST', location: 'New Delhi, India', x: 64, y: 47 },
    { offset: '+05:45', abbrev: 'NPT', location: 'Kathmandu, Nepal', x: 65, y: 46 },
    { offset: '+06:00', abbrev: 'BST', location: 'Dhaka, Bangladesh', x: 67, y: 48 },
    { offset: '+06:30', abbrev: 'MMT', location: 'Yangon, Myanmar', x: 68, y: 51 },
    { offset: '+07:00', abbrev: 'WIB', location: 'Jakarta, Indonesia', x: 72, y: 55 },
    { offset: '+08:00', abbrev: 'CST', location: 'Beijing, China', x: 76, y: 43 },
    { offset: '+08:45', abbrev: 'ACWST', location: 'Eucla, Australia', x: 74, y: 63 },
    { offset: '+09:00', abbrev: 'JST', location: 'Tokyo, Japan', x: 82, y: 43 },
    { offset: '+09:30', abbrev: 'ACST', location: 'Darwin, Australia', x: 78, y: 60 },
    { offset: '+10:00', abbrev: 'AEST', location: 'Sydney, Australia', x: 82, y: 62 },
    { offset: '+10:30', abbrev: 'LHST', location: 'Lord Howe Island', x: 83, y: 62 },
    { offset: '+11:00', abbrev: 'SBT', location: 'Solomon Islands', x: 87, y: 55 },
    { offset: '+12:00', abbrev: 'NZST', location: 'Auckland, New Zealand', x: 90, y: 63 },
    { offset: '+12:45', abbrev: 'CHAST', location: 'Chatham Islands', x: 91, y: 63 },
    { offset: '+13:00', abbrev: 'TOT', location: 'Tonga', x: 94, y: 58 },
    { offset: '+14:00', abbrev: 'LINT', location: 'Kiritimati', x: 96, y: 52 }
];

const timezoneList = document.getElementById('timezone-list');
const currentTimeDisplay = document.getElementById('current-time');
const currentDateDisplay = document.getElementById('current-date');
const timezoneDisplay = document.getElementById('timezone-display');
const searchInput = document.getElementById('search-input');
const worldMap = document.getElementById('world-map');

function formatDate(date) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
}

function addMapMarkers() {
    timeZones.forEach(tz => {
        const marker = document.createElement('div');
        marker.className = 'map-marker';
        marker.style.left = `${tz.x}%`;
        marker.style.top = `${tz.y}%`;
        marker.dataset.offset = tz.offset;
        marker.dataset.location = tz.location;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'marker-tooltip';
        tooltip.textContent = tz.location;
        marker.appendChild(tooltip);
        
        marker.addEventListener('click', () => {
            highlightTimezone(tz);
        });
        
        worldMap.appendChild(marker);
    });
}

function populateTimeZones() {
    timezoneList.innerHTML = '';
    timeZones.forEach(tz => {
        const li = document.createElement('li');
        li.className = 'timezone-item';
        li.dataset.offset = tz.offset;
        li.dataset.location = tz.location;

        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const [h, m] = tz.offset.split(':').map(Number);
        const tzTime = new Date(utc + ((h * 60 + m) * 60000));

        const timeString = tzTime.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
        const dateString = formatDate(tzTime);

        li.innerHTML = `
            <div class="timezone-details">
                <div class="timezone-location">${tz.location}</div>
                <div class="timezone-offset">UTC${tz.offset} | ${tz.abbrev}</div>
                <div class="timezone-date">${dateString}</div>
            </div>
            <div class="timezone-time">${timeString}</div>
        `;

        li.addEventListener('mouseenter', () => highlightTimezone(tz));
        li.addEventListener('click', () => highlightTimezone(tz));
        timezoneList.appendChild(li);
    });
}

function highlightTimezone(tz) {
    timezoneDisplay.textContent = `${tz.location} (UTC${tz.offset})`;
    updateTimezoneTime(tz);
    
    document.querySelectorAll('.timezone-item').forEach(item => {
        if(item.dataset.offset === tz.offset && item.dataset.location === tz.location) {
            item.classList.add('highlight');
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            item.classList.remove('highlight');
        }
    });
    
    document.querySelectorAll('.map-marker').forEach(marker => {
        if(marker.dataset.offset === tz.offset && marker.dataset.location === tz.location) {
            marker.style.transform = 'translate(-50%, -50%) scale(1.5)';
            marker.style.zIndex = '10';
            marker.style.boxShadow = '0 0 0 6px rgba(255, 56, 56, 0.4), 0 0 15px rgba(0,0,0,0.6)';
        } else {
            marker.style.transform = 'translate(-50%, -50%)';
            marker.style.zIndex = '1';
            marker.style.boxShadow = '0 0 0 4px rgba(255, 56, 56, 0.3), 0 0 10px rgba(0,0,0,0.5)';
        }
    });
}

function updateTimezoneTime(tz) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const [h, m] = tz.offset.split(':').map(Number);
    const tzTime = new Date(utc + ((h * 60 + m) * 60000));
    currentTimeDisplay.textContent = tzTime.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    currentDateDisplay.textContent = formatDate(tzTime);
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    document.querySelectorAll('.timezone-item').forEach(item => {
        const loc = item.dataset.location.toLowerCase();
        const off = item.dataset.offset.toLowerCase();
        item.style.display = (loc.includes(searchTerm)||off.includes(searchTerm))?'flex':'none';
    });
});

function init() {
    addMapMarkers();
    populateTimeZones();
    setInterval(() => {
        document.querySelectorAll('.timezone-item').forEach(item => {
            const [h,m] = item.dataset.offset.split(':').map(Number);
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const tzTime = new Date(utc + ((h*60+m)*60000));
            item.querySelector('.timezone-time').textContent = tzTime.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
            item.querySelector('.timezone-date').textContent = formatDate(tzTime);
        });
        const highlighted=document.querySelector('.timezone-item.highlight');
        if(highlighted){
            const tz=timeZones.find(z=>z.offset===highlighted.dataset.offset && z.location===highlighted.dataset.location);
            if(tz) updateTimezoneTime(tz);
        }
    },1000);
    if(timeZones.length>0) highlightTimezone(timeZones[15]); 
}

document.addEventListener('DOMContentLoaded', init);


