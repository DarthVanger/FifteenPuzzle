/**
 *  Saves Manager
 *  Provides methods for saving piece arrangement to server and getting saves from server.
 */
function SavesManager(config) {

  /**
   *  Width of the board in cells.
   *  Default: 4.
   */
  var boardWidth = 4;

  /**
   *  Get saved piece arrangement map from server
   */
  this.getSavedPieceArrangementMapFromServer = function(callback) {
    $.ajax({
      url: '/get-save'      
    })
    .done(function(response) {
      if (response == 'save doesn\'t exist') {
        // user has no save
        map = null;
      } else {
        // user has a save
        console.log('debug', 'SavesManager.getSave(): user has a save, parsing ' + map);
        var map = parsePieceArrangementMapFromJsonString(response);
      }
      callback(map);
    });
  }

  /**
   *  Save piece arrangement map to server
   */
  this.savePieceArrangementMap = function(pieceArrangementMap, callback) {
      var pieceArrangementMapJsonString = convertPieceArrangementMapToJsonString(pieceArrangementMap);
      console.log('debug', 'saving piece arrangement map, map = ' + pieceArrangementMapJsonString);
      $.post( '/save', { pieceArrangementMap: pieceArrangementMapJsonString }, function(response) {
        console.log('debug', 'save piece arrangment map server response: ' + response);  
        if (callback) {
          callback('Game was saved');
        }
      })  
      .error(function() {
        if (callback) {
          callback('Game save error!');
        }
      });
  }


  /*** Private Methods ***/

  /**
   *  Convert piece arrangement map from array to json string
   */
  function convertPieceArrangementMapToJsonString(pieceArrangementMap) {
    var map = pieceArrangementMap;
    var mapJson = {};
    mapJson.map = new Array(); 
    for (var i=0; i<map.length; i++) {
      for (var j=0; j<map[i].length; j++) {
        mapJson.map.push({
          'cell': {
            'x': i,
            'y': j
          },
          'pieceNumber': map[i][j]
        });
      }
    }
    return JSON.stringify(mapJson);
  }

  /**
   *  Parse piece arrangement map from json string
   *  @param mapJsonString json object. Example:
   *    {map: [{cell: {x: 0, y: 0}, pieceNumber: 4}, ...]}
   */
  function parsePieceArrangementMapFromJsonString(mapJsonString) {
    var mapJson = JSON.parse(mapJsonString);
    var cellsJsonArray = mapJson.map;

    // initialize 2d map array
    var mapArray = new Array(boardWidth);
    for (var i=0; i<boardWidth; i++) {
        mapArray[i] = new Array(boardWidth);
    }

    // parse the map
    for (var i=0; i<cellsJsonArray.length; i++) {
      var cell = cellsJsonArray[i].cell; 
      var pieceNumber = cellsJsonArray[i].pieceNumber; 
      mapArray[cell.x][cell.y] = pieceNumber;
    }
    return mapArray;
  }

  /*** End Private methods ***/

  /**
   *  Constructor
   */

  // read the config
  if(config.boardWidth) {
    boardWidth = config.boardWidth;
  }

  /** End Constructor **/


} // end SavesManager
