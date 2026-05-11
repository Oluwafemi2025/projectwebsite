// Available rooms data
const availableRooms = [
  {
    id: 'A101',
    type: 'single',
    block: 'A',
    price: 150000,
    occupants: 0,
    maxOccupants: 1,
    amenities: ['Private Bathroom', 'Air Conditioning', 'Study Desk'],
    available: true
  },
  {
    id: 'A102',
    type: 'double',
    block: 'A',
    price: 120000,
    occupants: 1,
    maxOccupants: 2,
    amenities: ['Shared Bathroom', 'Air Conditioning', 'Study Desk'],
    available: true
  },
  {
    id: 'B201',
    type: 'triple',
    block: 'B',
    price: 100000,
    occupants: 2,
    maxOccupants: 3,
    amenities: ['Shared Bathroom', 'Fan', 'Study Desk'],
    available: true
  },
  {
    id: 'B202',
    type: 'single',
    block: 'B',
    price: 160000,
    occupants: 0,
    maxOccupants: 1,
    amenities: ['Private Bathroom', 'Air Conditioning', 'Mini Fridge'],
    available: true
  },
  {
    id: 'C301',
    type: 'double',
    block: 'C',
    price: 110000,
    occupants: 0,
    maxOccupants: 2,
    amenities: ['Shared Bathroom', 'Air Conditioning', 'Common Area'],
    available: true
  },
  {
    id: 'C302',
    type: 'triple',
    block: 'C',
    price: 95000,
    occupants: 1,
    maxOccupants: 3,
    amenities: ['Shared Bathroom', 'Fan', 'Laundry Access'],
    available: true
  }
];

let selectedRoom = null;

document.addEventListener('DOMContentLoaded', function() {
  loadRooms();
  setupEventListeners();
  checkExistingBooking();
});

// Load and display rooms
function loadRooms(filterType = 'all', filterBlock = 'all') {
  const roomsGrid = document.getElementById('roomsGrid');
  roomsGrid.innerHTML = '';

  const filteredRooms = availableRooms.filter(room => {
    const typeMatch = filterType === 'all' || room.type === filterType;
    const blockMatch = filterBlock === 'all' || room.block === filterBlock;
    return typeMatch && blockMatch && room.available;
  });

  filteredRooms.forEach(room => {
    const roomCard = createRoomCard(room);
    roomsGrid.appendChild(roomCard);
  });
}

// Create room card element
function createRoomCard(room) {
  const card = document.createElement('div');
  card.className = 'room-card';
  card.innerHTML = `
    <div class="room-header">
      <h4>Room ${room.id}</h4>
      <span class="room-type ${room.type}">${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</span>
    </div>
    <div class="room-details">
      <p><strong>Block:</strong> ${room.block}</p>
      <p><strong>Price:</strong> ₦${room.price.toLocaleString()}/session</p>
      <p><strong>Occupants:</strong> ${room.occupants}/${room.maxOccupants}</p>
      <div class="amenities">
        <strong>Amenities:</strong>
        <ul>
          ${room.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
        </ul>
      </div>
    </div>
    <button class="btn select-room" data-room-id="${room.id}">
      ${room.occupants < room.maxOccupants ? 'Select Room' : 'Waitlist'}
    </button>
  `;

  return card;
}

// Setup event listeners
function setupEventListeners() {
  // Room type filter
  document.getElementById('roomType').addEventListener('change', function() {
    const roomType = this.value;
    const block = document.getElementById('block').value;
    loadRooms(roomType, block);
  });

  // Block filter
  document.getElementById('block').addEventListener('change', function() {
    const block = this.value;
    const roomType = document.getElementById('roomType').value;
    loadRooms(roomType, block);
  });

  // Room selection
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('select-room')) {
      const roomId = e.target.dataset.roomId;
      selectRoom(roomId);
    }
  });

  // Dropdown functionality
  const dropdownToggle = document.getElementById('dropdownToggle');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function() {
      dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
      if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('active');
      }
    });
  }
}

// Search rooms function
function searchRooms() {
  const roomType = document.getElementById('roomType').value;
  const block = document.getElementById('block').value;
  loadRooms(roomType, block);
}

// Select room function
function selectRoom(roomId) {
  const room = availableRooms.find(r => r.id === roomId);
  if (!room || room.occupants >= room.maxOccupants) return;

  selectedRoom = room;

  // Update UI
  document.querySelectorAll('.select-room').forEach(btn => {
    btn.textContent = 'Select Room';
    btn.classList.remove('selected');
  });

  const selectedBtn = document.querySelector(`[data-room-id="${roomId}"]`);
  selectedBtn.textContent = 'Selected';
  selectedBtn.classList.add('selected');

  // Show booking summary
  showBookingSummary(room);
}

// Show booking summary
function showBookingSummary(room) {
  const summary = document.getElementById('bookingSummary');
  document.getElementById('selectedRoom').textContent = room.id;
  document.getElementById('selectedRoomType').textContent = room.type.charAt(0).toUpperCase() + room.type.slice(1) + ' Room';
  document.getElementById('roomPrice').textContent = `₦${room.price.toLocaleString()}`;

  summary.style.display = 'block';
  summary.scrollIntoView({ behavior: 'smooth' });
}

// Proceed to payment
function proceedToPayment() {
  if (!selectedRoom) {
    alert('Please select a room first.');
    return;
  }

  // Save selected room to localStorage
  localStorage.setItem('selectedHostelRoom', JSON.stringify(selectedRoom));

  // Redirect to payment page with hostel parameter
  window.location.href = 'student-payment.html?type=hostel';
}

// Check for existing booking
function checkExistingBooking() {
  const hostelData = JSON.parse(localStorage.getItem('studentHostel'));
  if (hostelData && hostelData.allocated) {
    // User already has a booking
    const summary = document.getElementById('bookingSummary');
    document.getElementById('selectedRoom').textContent = `Room ${hostelData.room}`;
    document.getElementById('selectedRoomType').textContent = 'Already Booked';
    document.getElementById('roomPrice').textContent = 'Paid';

    const paymentBtn = summary.querySelector('button');
    paymentBtn.textContent = 'Already Booked';
    paymentBtn.disabled = true;

    summary.style.display = 'block';
  }
}