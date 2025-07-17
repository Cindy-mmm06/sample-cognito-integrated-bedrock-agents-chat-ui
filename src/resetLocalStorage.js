// Script to reset localStorage if needed
// Add ?reset=true to the URL to trigger this

(function() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('reset')) {
    console.log('Resetting localStorage...');
    localStorage.clear();
    // Remove the query parameter
    window.history.replaceState({}, document.title, window.location.pathname);
    console.log('localStorage reset complete');
  }
})();