const cards = document.querySelectorAll('.asst-card');
document.addEventListener('DOMContentLoaded', initStatus);

function initStatus() {
  console.log('Initialising screens');
  cards.forEach(card => {
    const status = card.querySelector('.status').textContent.trim();
    const screen = card.querySelector('.st0');
    console.log(status, status.length);
    if(status === 'Status: Unavailable') {console.log('Changing screen to red'); screen.style.fill = 'rgb(255, 0, 0)';}
    if(status === 'Status: Available') screen.style.fill = 'rgb(0,255,0)';
  })
}

// Register new route to receive SSE events
const eventSource = new EventSource('/events');
// When event received
eventSource.onmessage = event => {
  console.log('Received event');
  const statusUpdate = JSON.parse(event.data);
  console.log(statusUpdate);
  setStatus(statusUpdate);
};


function setStatus (statusUpdate) {
  cards.forEach(card => {
    if (Number(card.id) === statusUpdate.id) {
      console.log(`Updating card ${card}`);
      // const status = statusUpdate.status.split(' ')[0];
      
      if (statusUpdate.status === "Connect") {
        card.querySelector('.st0').style.fill = 'rgb(255, 0, 0)';
        card.querySelector('.status').innerHTML = "Status: Unavailable";
      }
      if (statusUpdate.status === "Disconnect") {
        card.querySelector('.st0').style.fill = 'rgb(0, 255, 0)';
        card.querySelector('.status').innerHTML = "Status: Available";
      }
    }
  })
}

