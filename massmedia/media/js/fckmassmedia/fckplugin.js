var MassMediaCommand=function(){
    //create our own command, we dont want to use the FCKDialogCommand because it uses the default fck layout and not our own
};
MassMediaCommand.GetState=function() {
    return FCK_TRISTATE_OFF; //we dont want the button to be toggled
}
MassMediaCommand.Execute=function() {
    window.open('insertVariable.do', 'insertVariable', 'width=500,height=400,scrollbars=no,scrolling=no,location=no,toolbar=no');
}
FCKCommands.RegisterCommand('MassMedia', MassMediaCommand ); //otherwise our command will not be found
var oMassMedias = new FCKToolbarButton('MassMedia', 'insert media');
oMassMedias.IconPath = FCKConfig.PluginsPath + 'icon.png'; //specifies the image used in the toolbar
FCKToolbarItems.RegisterItem( 'MassMedia', oMassMedias );