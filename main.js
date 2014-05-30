/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */
define(function (require, exports, module) {
    'use strict';
    
    //vars
    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        Menus = brackets.getModule("command/Menus"),
        Commands = brackets.getModule("command/Commands"),
        AppInit = brackets.getModule("utils/AppInit"),
        KeyEvent = brackets.getModule("utils/KeyEvent");
    
    var numberOfTabs = function (text) {
        var count = 0;
        var index = 0;
        while (text.charAt(index++) === " ") {
            count++;
        }
        return count;
    };
    
    var keyEventHandler = function ($event, editor, event) {
        var cursorPosition,
            line,
            word,
            start,
            last,
            pline,
            tabs;
            
        if (((event.type === "keydown") && (event.keyCode === 13))) {
            cursorPosition = editor.getCursorPos();
            line = editor.document.getLine(cursorPosition.line);
            pline = editor.document.getLine(cursorPosition.line - 1);
            last = line[line.length - 1];
            if (last === '{') {
                tabs = numberOfTabs(pline);
                editor.document.replaceRange(
                    '\n' + new Array(tabs + 1).join(' ') + '}', 
                    cursorPosition, 
                    cursorPosition
                );
                editor.setCursorPos(cursorPosition.line, cursorPosition.ch+4);
            }
        }
    };
            
    var activeEditorChangeHandler = function ($event, focusedEditor, lostEditor) {
        if (lostEditor) {
            $(lostEditor).off("keyEvent", keyEventHandler);
        }
        if (focusedEditor) {
            $(focusedEditor).on("keyEvent", keyEventHandler);
        }
    };
    
    AppInit.appReady(function () {
        CommandManager.register("Auto Brackets", "beldar.auto-brackets", autoBrackets);
        var currentEditor = EditorManager.getCurrentFullEditor();
        $(currentEditor).on('keyEvent', keyEventHandler);
        $(EditorManager).on('activeEditorChange', activeEditorChangeHandler);
    });
});
