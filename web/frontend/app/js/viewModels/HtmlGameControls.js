/**
 *  Html Game Controls
 */
function HtmlGameControls() {

  /**
   *  Save button HTMLElement
   */

  var saveButton;
  /**
   *  HTMLElement for displaying notifications
   */
  var notificationDiv;

  /**
   *  Show a message to user.
   *  Message disappears in 1 second.
   *
   *  @param message string to show to user.
   */
  this.notifyUser = function(message) {
    $(notificationDiv).show();
    $(notificationDiv).html(message);
    setTimeout(function() {
      $(notificationDiv).fadeOut(1000);
    }, 1300);
  }

  /*** Private Methods ***/

  /**
   *  Add click listeners for game controls.
   */
  function addClickListeners() {
    $('#save-button').on('click', function() {
      console.log('debug', 'HtmlGameControls: triggering \'SaveButtonClick\' event');
      $(document).trigger('SaveButtonClick');
    }); 
  }

  /*** End Private methods ***/

  /**
   *  Constructor
   */
  saveButton = document.getElementById('save-button');
  notificationDiv = document.getElementById('notification');
  addClickListeners();
  
  /** End Constructor **/
}
