var opts = 'width=700,height=400,scrollbars=yes,scrolling=yes,location=no,toolbar=no';

//Audio
var MassAudioCommand=function(){};
MassAudioCommand.GetState=function() {return FCK_TRISTATE_OFF;}
MassAudioCommand.Execute=function() {
    window.open('/admin/massmedia/audio/?t=id&pop=1', 'MassAudio', opts);
}
FCKCommands.RegisterCommand('MassAudio', MassAudioCommand ); 
var oMassAudios = new FCKToolbarButton('MassAudio', 'insert audio');
oMassAudios.IconPath = FCKConfig.PluginsPath + 'fckmassmedia/audio.gif'; 
FCKToolbarItems.RegisterItem( 'MassAudio', oMassAudios );

//Video
var MassVideoCommand=function(){};
MassVideoCommand.GetState=function() {return FCK_TRISTATE_OFF;}
MassVideoCommand.Execute=function() {
    window.open('/admin/massmedia/video/?t=id&pop=1', 'MassVideo', opts);
}
FCKCommands.RegisterCommand('MassVideo', MassVideoCommand ); 
var oMassVideos = new FCKToolbarButton('MassVideo', 'insert media');
oMassVideos.IconPath = FCKConfig.PluginsPath + 'fckmassmedia/video.gif'; 
FCKToolbarItems.RegisterItem( 'MassVideo', oMassVideos );

//Image
var MassImageCommand=function(){};
MassImageCommand.GetState=function() {return FCK_TRISTATE_OFF;}
MassImageCommand.Execute=function() {
    window.open('/admin/massmedia/image/?t=id&pop=1', 'MassImage', opts);
}
FCKCommands.RegisterCommand('MassImage', MassImageCommand ); 
var oMassImages = new FCKToolbarButton('MassImage', 'insert image');
oMassImages.IconPath = FCKConfig.PluginsPath + 'fckmassmedia/image.gif'; 
FCKToolbarItems.RegisterItem( 'MassImage', oMassImages );

//Flash
var MassFlashCommand=function(){};
MassFlashCommand.GetState=function() {return FCK_TRISTATE_OFF;}
MassFlashCommand.Execute=function() {
    window.open('/admin/massmedia/flash/?t=id&pop=1', 'MassFlash', opts);
}
FCKCommands.RegisterCommand('MassFlash', MassFlashCommand ); 
var oMassFlashs = new FCKToolbarButton('MassFlash', 'insert flash');
oMassFlashs.IconPath = FCKConfig.PluginsPath + 'fckmassmedia/flash.gif'; 
FCKToolbarItems.RegisterItem( 'MassFlash', oMassFlashs );

// Handles related-objects functionality: lookup link for raw_id_fields
// and Add Another links.

function html_unescape(text) {
    // Unescape a string that was escaped using django.utils.html.escape.
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#39;/g, "'");
    text = text.replace(/&amp;/g, '&');
    return text;
}

// IE doesn't accept periods or dashes in the window name, but the element IDs
// we use to generate popup window names may contain them, therefore we map them
// to allowed characters in a reversible way so that we can locate the correct 
// element when the popup window is dismissed.
function id_to_windowname(text) {
    text = text.replace(/\./g, '__dot__');
    text = text.replace(/\-/g, '__dash__');
    return text;
}

function windowname_to_id(text) {
    text = text.replace(/__dot__/g, '.');
    text = text.replace(/__dash__/g, '-');
    return text;
}

function showRelatedObjectLookupPopup(triggeringLink) {
    var name = triggeringLink.id.replace(/^lookup_/, '');
    name = id_to_windowname(name);
    var href;
    if (triggeringLink.href.search(/\?/) >= 0) {
        href = triggeringLink.href + '&pop=1';
    } else {
        href = triggeringLink.href + '?pop=1';
    }
    var win = window.open(href, name, 'height=500,width=800,resizable=yes,scrollbars=yes');
    win.focus();
    return false;
}

function dismissRelatedLookupPopup(win, chosenId) {
    var name = windowname_to_id(win.name);
    var elem = document.getElementById(name);
    if (elem.className.indexOf('vManyToManyRawIdAdminField') != -1 && elem.value) {
        elem.value += ',' + chosenId;
    } else {
        document.getElementById(name).value = chosenId;
    }
    win.close();
}

function showAddAnotherPopup(triggeringLink) {
    var name = triggeringLink.id.replace(/^add_/, '');
    name = id_to_windowname(name);
    href = triggeringLink.href
    if (href.indexOf('?') == -1) {
        href += '?_popup=1';
    } else {
        href  += '&_popup=1';
    }
    var win = window.open(href, name, 'height=500,width=800,resizable=yes,scrollbars=yes');
    win.focus();
    return false;
}

function dismissAddAnotherPopup(win, newId, newRepr) {
    // newId and newRepr are expected to have previously been escaped by
    // django.utils.html.escape.
    newId = html_unescape(newId);
    newRepr = html_unescape(newRepr);
    var name = windowname_to_id(win.name);
    var elem = document.getElementById(name);
    if (elem) {
        if (elem.nodeName == 'SELECT') {
            var o = new Option(newRepr, newId);
            elem.options[elem.options.length] = o;
            o.selected = true;
        } else if (elem.nodeName == 'INPUT') {
            elem.value = newId;
        }
    } else {
        var toId = name + "_to";
        elem = document.getElementById(toId);
        var o = new Option(newRepr, newId);
        SelectBox.add_to_cache(toId, o);
        SelectBox.redisplay(toId);
    }
    win.close();
}
