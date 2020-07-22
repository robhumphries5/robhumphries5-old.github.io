var chessApp = angular.module('chessApp', []);

chessApp.controller('chessController', function chessController($scope) {

    $scope.start = startingBoard;

    $scope.board = [];
    var rows = 8;
    var cols = 8;
    for(var i=0;i<rows;i++){
        var row = [];
        for(var j=0;j<cols;j++){
            var cell = {
                piece:"",
                selected:false,
                team:"",
                row:8-i,
                col:getCol(j)
            };
            row.push(cell);
        }
        $scope.board.push(row)
    }

    setBoard();

    $scope.selected = {};
    $scope.action = "select";
    $scope.clickCell = function(cell){

        switch($scope.action){
            case "select":
                selectCell(cell);
                break;
            case "move":
                moveToCell(cell);
                break;

        }
        

    }

    function moveToCell(cell){
        if($scope.selected != {}){
            cell.piece = $scope.selected.piece;
            cell.team = $scope.selected.team;
            applyToEveryCell(removeMovedPiece)
            $scope.selected = {};
            applyToEveryCell(clearSelected);
            $scope.action = "select";
        }
    }


    function selectCell(cell){
        // if nothing is selected select the clicked cell
        // if something is selected
        // if it is this cell that is selected deselect it
        // if it is another cell deselect that cell and select this one

        if($scope.selected == {} && cell.piece!=""){
            cell.selected = true;
            $scope.selected = cell;
            $scope.action = "move";
        } else {
            if($scope.selected.row == cell.row && $scope.selected.col == cell.col && cell.piece!=""){
                cell.selected = false;
                $scope.selected = {};
                $scope.action = "select";
            } else if(cell.piece!="") {
                applyToEveryCell(clearSelected);
                cell.selected = true;
                $scope.selected = cell;
                $scope.action = "move";
            }
        }
    }

    function applyToEveryCell(f){
        $scope.board.forEach(row => {
            row.forEach(cell => {
                f(cell);
            });
        });
    }

    function removeMovedPiece(cell){
        if(cell.row == $scope.selected.row && cell.col == $scope.selected.col){
            cell.piece = "";
            cell.team = "";
        }
    }

    function clearSelected(cell){
        cell.selected=false;
    }

    function setBoard(){
       applyToEveryCell(setStart);
    }

    function setStart(cell){
        $scope.start.forEach(startCell => {
            if(cell.row == startCell.row && cell.col == startCell.col){
                cell.piece = startCell.piece;
                cell.team = startCell.team;
            }
        })
    }

    function getCol(number){
        var cols = ["a","b","c","d","e","f","g","h"];
        return cols[number];
    }


   

})