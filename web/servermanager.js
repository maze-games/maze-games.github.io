


/**
 * Create a HTML table for list of server
 */
function populateHtmlTableForServer(bodyid, maze, cellbuilder) {

    var i,j;
    for (i = maze.rows - 1; i >= 0; i--) {

    }
}

/**
 * Start a new server. 'gridname' might be a href to a remote grid (Needs to start with 'http').
 */
function startServer(gridname) {
    $("#btn_start").prop("disabled", true);
    console.log(gridname);
    httpPost(servermanagerhost + "/server?scenename=de.yard.threed.maze.MazeScene&gridname="+gridname, null,
        function(isJson, data) {
            console.log(data); // JSON data parsed by `data.json()` call
            loadServerList();
            $("#btn_start").prop("disabled", false);
        },
        function() {
             console.error("startServer failed");
        }, {  });
}

/**
 * Load list of server
 */
function loadServerList() {
    httpGet(servermanagerhost + "/server/list", null,
        function(isJson, data) {
            //console.log(data);
            removeTableRows("tab_server");

            // rowid is key
            var allServerMap = new Map();
            data.serverInstanceList.forEach(function(s) {
                //console.log("s:",s);
                var rowid = addTableRow('bod_server');
                allServerMap.set(rowid, s);
                var colid = addTableCol(enhanceGridname(s.gridname), rowid, "");
                var colid = addTableCol(s.started, rowid, "");
                var colid = addTableCol(s.baseport, rowid, "");
                var colid = addTableCol(s.upTime, rowid, "");
                var colid = addTableCol(s.state, rowid, "");
                var btn_stop = createButton("Stop", "w3-button w3-round w3-khaki");
                var colid = addTableCol(btn_stop.html, rowid, "");
                var btn_join = createButton("Join", "w3-button w3-round w3-khaki");
                addTableCol(btn_join.html, rowid, "");

                $("#"+btn_stop.id).prop("disabled", s.state != "running");
                $("#"+btn_stop.id).attr('data-rowid', rowid);
                $("#"+btn_stop.id).click(function() {
                     $(this).prop("disabled", true);
                     var server = allServerMap.get(this.dataset.rowid);
                     httpDelete(servermanagerhost + "/server?id="+server.id, null,
                         function() {
                             loadServerList();
                         },
                         function() {
                         });
                });
                $("#"+btn_join.id).prop("disabled", s.state != "running");
                $("#"+btn_join.id).attr('data-rowid', rowid);
                $("#"+btn_join.id).click(function() {
                     var server = allServerMap.get(this.dataset.rowid);
                     // the URL complies to the reverse proxy setup on the server
                     launchMazeForJoining(false, sceneserverhost + ":443:/sceneserver/" + (server.baseport+1) + "/connect");
                });
            });
            serverManagerState = "✅";
            refreshStates();
        },
        function() {
            // already logged
            serverManagerState = "❌";
            refreshStates();
        });
}

function enhanceGridname(gridname) {
    if (gridname.startsWith("http")) {
        // get readable name from games list
        var mazeid = substringAfterLast(gridname, "/");
        //console.log("Looking for maze id " + mazeid);
        var maze = findMazeById(mazeid);
        if (maze != null) {
            // might not yet been loaded
            return maze.name;
        }
    }
    return gridname;
}

