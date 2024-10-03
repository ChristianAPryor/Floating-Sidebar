// Check if the button already exists to avoid duplicates
if (!document.getElementById('toggle-sidebar-button')) {
  // Create the toggle button
  const button = document.createElement('button');
  button.id = 'toggle-sidebar-button';
  // button.textContent = '<';
  button.style.position = 'fixed';
  button.style.top = 'calc(40vh)';
  button.style.right = '0';
  button.style.zIndex = '999999';
  button.style.padding = '10px';
  button.style.backgroundColor = '#008CBA';
  button.style.backgroundImage = 'icon.png';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '50%';
  button.style.cursor = 'pointer';
  button.style.width = '20px';
  button.style.height = '20px';

  document.body.appendChild(button);

  // Create the sidebar iframe
  const sidebar = document.createElement('iframe');
  sidebar.id = 'floating-sidebar';
  sidebar.src = chrome.runtime.getURL('sidebar.html');
  sidebar.style.position = 'fixed';
  sidebar.style.top = '0';
  sidebar.style.right = '0';
  sidebar.style.width = '300px';  // Adjust width as needed
  sidebar.style.height = '100%';
  sidebar.style.zIndex = '999998';  // Lower z-index so it's below the button
  sidebar.style.border = 'none';
  sidebar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  sidebar.style.display = 'none';  // Initially hidden

  document.body.appendChild(sidebar);

  // Toggle sidebar visibility when the button is clicked
  button.addEventListener('click', () => {
    sidebar.style.display = 'block';
    button.style.display = 'none';  // Hide the button
  });

  // Listen for messages from the iframe to close the sidebar
  window.addEventListener('message', (event) => {
    if (event.data.action === 'close-sidebar') {
      sidebar.style.display = 'none';  // Hide the sidebar
      button.style.display = 'block';  // Show the button again
    }
  });
}
