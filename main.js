/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */
define(function (require, exports, module) {
    'use strict';
    
    //vars
    var EditorManager = brackets.getModule("editor/EditorManager"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        AppInit = brackets.getModule("utils/AppInit"),
        KeyEvent = brackets.getModule("utils/KeyEvent"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        useTabChar = PreferencesManager.get('useTabChar'),
        spaceUnits = parseInt(PreferencesManager.get('spaceUnits')),
        tabChar = useTabChar ? '\t' : ' ';
    
    var numberOfTabs = function (text) {
        var count = 0,
            index = 0;
        
        while (text.charAt(index++) === tabChar) {
            count++;
        }
        return count;
    };
    
    var insertClose = function (editor, cursorPosition, tabs, char) {
        editor.document.replaceRange(
            '\n' + new Array(tabs + 1).join(tabChar) + char, 
            cursorPosition, 
            cursorPosition
        );
        editor.setCursorPos(cursorPosition.line, cursorPosition.ch + spaceUnits);
    };
    
    var keyEventHandler = function ($event, editor, event) {
        var cursorPosition,
            line,
            word,
            start,
            last,
            tabs,
            tabchar;
            
        if (((event.type === "keydown") && (event.keyCode === 13))) {
            cursorPosition = editor.getCursorPos();
            line = editor.document.getLine(cursorPosition.line);
            last = line[line.length - 1];
            tabs = numberOfTabs(line);
            switch (last) {
                case '{':
                    insertClose(editor, cursorPosition, tabs, '}');
                    break;
                case '[':
                    insertClose(editor, cursorPosition, tabs, ']');
                    break;
                case '(':
                    insertClose(editor, cursorPosition, tabs, ')');
                    break;
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
        var currentEditor = EditorManager.getCurrentFullEditor();
        $(currentEditor).on('keyEvent', keyEventHandler);
        $(EditorManager).on('activeEditorChange', activeEditorChangeHandler);
    });
});















