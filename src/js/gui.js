//TODO do something about these messages :(


function help() {
    modal.style.display = shade.style.display = 'block';
    insidemodal.appendChild(helptext);
}

function zavri() {
    modal.style.display = shade.style.display = 'none';
}

function helptransition() {

    helptext.nodeValue = "After you click on the radio button, you can insert transitions by clicking on the drawing area under the radio button bar.";
}

function helpplace() {

    helptext.nodeValue = "After you click on the radio button, you can insert places by clicking on the drawing area under the radio button bar.";
}

function helpstaticplace() {
    helptext.nodeValue = "After you click on the radio button, you can insert static places by clicking on the drawing area under the radio button bar.";
}

function helpaddtoken() {
    helptext.nodeValue = "After you click on the radio button, you can insert tokens into a place/static place by clicking on the place/static place.";
}

function helpremovetoken() {
    helptext.nodeValue = "After you click on the radio button, you can remove tokens from a place/static place by clicking on the place/static place.";
}

function helpmarking() {
    helptext.nodeValue = "After you click on the radio button, you can change the marking of a place/static place by clicking on the place/static place. Then a prompt dialog window will appears, where you can insert the value of the marking.";
}

function helplabel() {
    helptext.nodeValue = "After you click on the radio button, you can add/change the label of a place/transition by clicking on the place/transition. Then a prompt dialog window will appears, where you can insert/change the label.";
}

function helparc() {
    helptext.nodeValue = "After you click on the radio button, you can add arcs between places and transitions. By clicking on a place/transition, you start to draw an arc, which has now the red color. By clicking second time over a place/transition, the arc is added. You cannot connect a place with another place and a transition with another transition.";
}

function helparc_weight() {
    helptext.nodeValue = "After you click on the radio button, you can add a weight to regular/inhibitor arcs. By clicking on an arc, a prompt dialog window will appears, where you can enter the weight of the arc.";
}

function helpresetarc() {
    helptext.nodeValue = "After you click on the radio button, you can add a reset arc connecting a place with a transition. By clicking on a place, you start to draw a reset arc, which has now the red color. By clicking second time over a transition, the reset arc is added.";
}

function helpinhibitorarc() {
    helptext.nodeValue = "After you click on the radio button, you can add an inhibitor arc connecting a place with a transition. By clicking on a place, you start to draw an inhibitor arc, which has now the red color. By clicking second time over a transition, the inhibitor arc is added.";
}

function helpreadarc() {
    helptext.nodeValue = "After you click on the radio button, you can add a read arc connecting a place with a transition. By clicking on a place, you start to draw a read arc, which has now the red color. By clicking second time over a transition, the read arc is added.";
}

function helpposition() {
    helptext.nodeValue = "After you click on the radio button, you can change position of a place, a transition or a break point of an arc. By clicking on an element, a prompt dialog window will appears, where you can enter the value of the x-coordinate of the element. Then another prompt dialog appears, where you can enter the value of the y-coordinate.";
}

function helpdelete() {
    helptext.nodeValue = "After you click on the radio button, you can delete elements. If you click on a place, static place, transition, or omn a break point of an arc, it will be deleted. To delete the entire arc, you have to click on the arc at a different position than its break points.";
}

function helpmove() {
    helptext.nodeValue = "After you click on the radio button, you can move elements. If you go over a place or a transition and click, it becomes to be red and movable. If you click on a break point of an arc, it becomes movable too. If you click on an arc at a different position than its break points, a new break point is added to the arcs and it becomes movable. To stop moving the element, you have to click second time. ";
}

function helpfire() {
    helptext.nodeValue = "After you click on the radio button, you will change to the firing mode. The transitions, which are enabled to fire, become green. A transition is enabled to fire if the sum of the weights of the arcs from places to the transition is smaller or equal to the number of tokens in the places and if the number of tokens in any place connected by an inhibitor arc with the transition is smaller than the weight of the inhibitor arc. Just click on an enabled green transition to fire it. For an arc from a place to the transition it will remove the number of tokens given by the arc weight from the place. For an arc from the transition to a place, it will add the number of tokens given by the arc weight to the place. Note that the default weight of an arc is one. For a reset arc from a place to the transition, it will remove all tokens from the place. An inhibitor arc from a place to the transition does not change the marking of the place by firing.";
}


function add_row() {
    var new_variable = document.getElementById("new_variable").value;
    var new_value = document.getElementById("new_value").value;

    var table = document.getElementById("data_table");
    var table_len = (table.rows.length) - 1;
    var actualid = attachid();
    var row = table.insertRow(table_len).outerHTML = "<tr id='row" + actualid + "'>"
        + "<td id='variable_row" + actualid + "'>" + new_variable + "</td>"
        + "<td id='value_row" + actualid + "'>" + new_value + "</td>"
        + "<td><input class='button--input' type='button' id='edit_button" + actualid + "' value='Edit'"
        + " onclick='edit_row(" + actualid + ")'>"
        + "<label for='edit_button" + actualid + "' id='label_edit" + actualid + "' title='edit'><img src='img/icons/edit_data.svg' alt='edit'/></label>"
        + " <input class='button--input' type='button' id='save_button" + actualid + "' value='Save'"
        + " onclick='save_row(" + actualid + ")'>"
        + "  <label for='save_button" + actualid + "' id='label_save" + actualid + "' title='save'><img src='img/icons/save_data.svg' alt='save'/></label>"
        + " <input class='button--input' type='button' id='delete_button" + actualid + "' value='Delete' onclick='delete_row(" + actualid + ")'>"
        + " <label for='delete_button" + actualid + "' id='label_delete" + actualid + "' title='delete'><img src='img/icons/delete_data.svg' alt='delete'/></label>"
        + "<input class='button--input' type='button' id='attach_button" + actualid + "' value='Attach'"
        + " onclick='attach_row(" + actualid + ")'>"
        + "<label for='attach_button" + actualid + "' id='label_attach" + actualid + "' title='attach to arc'><img src='img/icons/attach_data.svg' alt='attach'/></label>"
        + "</td></tr>";

    processdata[processdata.length] = new DataVariable(actualid);
    processdata[processdata.length - 1].name = new_variable;
    processdata[processdata.length - 1].value = new_value;

    document.getElementById("label_edit" + actualid).style.display = "inline-block";
    document.getElementById("label_delete" + actualid).style.display = "inline-block";
    document.getElementById("label_save" + actualid).style.display = "none";
    document.getElementById("label_attach" + actualid).style.display = "none";


    document.getElementById("new_variable").value = "";
    document.getElementById("new_value").value = "";
}

function delete_row(no) {
    delete_arc_references(no);

    var i = getVariableIndexByID(no);

    if (i > -1) {
        processdata.splice(i, 1);
        document.getElementById("row" + no + "").outerHTML = "";
    }
    else
        alert("Cannot find this variable");

}

function attach_row(no) {
    var i = getVariableIndexByID(no);

    var vaha = parseInt(processdata[i].value);

    if (isNaN(vaha)) {
        alert("Not a number. Cannot change the value of arc weight.");

    }
    if (vaha < 0) {
        alert("A negative number. Cannot change the value of arc weight.");
    }

    if (!isNaN(vaha) && vaha >= 0) {

        arc_for_data.vaha = vaha;

        var varname = parseInt(processdata[i].name);
        if (!isNaN(varname)) {
            alert("Warning. Variable name starts with a number. Apostrophes added.");
        }
        if (!processdata[i].name.replace(/\s/g, '').length) {
            alert("Warning. Variable name only containes whitespaces. Apostrophes added.");
        }

        if (!isNaN(varname) || !processdata[i].name.replace(/\s/g, '').length) {
            arc_for_data.vahalabel = "\"" + processdata[i].name + "\"";
        }
        else {
            arc_for_data.vahalabel = processdata[i].name;
        }
        arc_for_data.dataref = processdata[i];

        zavri2();
        arc_for_data.objektyhrany.vaha.nodeValue = arc_for_data.vahalabel;
        Arc.updatehranusvg(arc_for_data);

    }
}

function delete_arc_references(no) {
    var i = getVariableIndexByID(no);


    for (var j = 0; j < arcs.length; j++) {
        if (arcs[j].dataref === processdata[i]) {
            arcs[j].dataref = false;
            arcs[j].vahalabel = arcs[j].vaha;

            arcs[j].objektyhrany.vaha.nodeValue = arcs[j].vahalabel;
            Arc.updatehranusvg(arcs[j]);


        }
    }
}

function edit_row(no) {
    document.getElementById("label_edit" + no).style.display = "none";
    document.getElementById("label_save" + no).style.display = "inline-block";

    var variable = document.getElementById("variable_row" + no);
    var value = document.getElementById("value_row" + no);

    var variable_data = variable.innerHTML;
    var value_data = value.innerHTML;

    variable.innerHTML = "<input type='text' id='variable_text" + no + "' value='" + variable_data + "'>";
    value.innerHTML = "<input type='text' id='value_text" + no + "' value='" + value_data + "'>";

}

function save_row(no) {

    var variable_val = document.getElementById("variable_text" + no).value;
    var value_val = document.getElementById("value_text" + no).value;

    document.getElementById("variable_row" + no).innerHTML = variable_val;
    document.getElementById("value_row" + no).innerHTML = value_val;

    var i = getVariableIndexByID(no);

    processdata[i].name = variable_val;
    processdata[i].value = value_val;
    change_arc_weights(no);

    document.getElementById("label_edit" + no).style.display = "inline-block";
    document.getElementById("label_save" + no).style.display = "none";
}


function change_arc_weights(no) {
    var i = getVariableIndexByID(no);


    for (var j = 0; j < arcs.length; j++) {
        if (arcs[j].dataref === processdata[i]) {
            var vaha = parseInt(processdata[i].value);

            if (isNaN(vaha)) {
                alert("Not a number. Cannot change the value of arc weight.");

            }
            if (vaha < 0) {
                alert("A negative number. Cannot change the value of arc weight.");
            }

            if (!isNaN(vaha) && vaha >= 0) {

                arcs[j].vaha = vaha;

                var varname = parseInt(processdata[i].name);
                if (!isNaN(varname)) {
                    alert("Warning. Variable name starts with a number. Apostrophes added.");
                }
                if (!processdata[i].name.replace(/\s/g, '').length) {
                    alert("Warning. Variable name only containes whitespaces. Apostrophes added.");
                }

                if (!isNaN(varname) || !processdata[i].name.replace(/\s/g, '').length) {
                    arcs[j].vahalabel = "\"" + processdata[i].name + "\"";
                }
                else {
                    arcs[j].vahalabel = processdata[i].name;
                }
                arcs[j].objektyhrany.vaha.nodeValue = arcs[j].vahalabel;
                Arc.updatehranusvg(arcs[j]);

            }
        }
    }
}




function attach_data_to_arc(chosenarc) {
    datadiv.style.display = shade.style.display = 'block';
    arc_for_data = chosenarc;

    var no;
    for (var i = 0; i < processdata.length; i++) {
        no = processdata[i].id;
        document.getElementById("label_edit" + no).style.display = "none";
        document.getElementById("label_save" + no).style.display = "none";
        document.getElementById("label_delete" + no).style.display = "none";
        document.getElementById("label_attach" + no).style.display = "inline-block";
    }

    document.getElementById("last_row").style.display = "none";
}

function zavri2() {
    datadiv.style.display = shade.style.display = 'none';
}

function DataVariable(no) {
    this.name = "";
    this.value = "";
    this.id = no;
}

function getVariableIndexByID(no) {
    for (var i = 0; i < processdata.length; i++) {
        if (processdata[i].id == no) {
            return i;
        }
    }
    return -1;
}