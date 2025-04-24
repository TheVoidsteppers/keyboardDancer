# keyboard-dancer

This extension ports customize Vim keyboard shortcuts to Visual Studio Code.

## Usage

### Import settings

The first time the extension is launched a prompt is shown that lets you import the extension setttings.
If you want to import the extension settings at a later time use the `Keyboard Dancer Keymap: Import Keyboard Dancer Setting` command from the Command Palette

# Configuration

```json
{
  "keyboard-dancer.console.log.functionName": "console.log",
  "keyboard-dancer.console.log.format": "$functoin($var)",
}
```

## Keyboard Dancer settings

```json
{
  "workbench.editor.openPositioning": "last",
  "editor.lineNumbers": "relative",
  "editor.cursorSurroundingLines": 10,
  "vim.camelCaseMotion.enable": true,
  "vim.easymotion": true,
  "vim.foldfix": true,
  "vim.sneak": true,
  "vim.surround": true,
  "vim.useCtrlKeys": true,
  "vim.useSystemClipboard": true,
  "vim.handleKeys": {
    "<C-a>": false,
    "<C-f>": false,
    "<C-s>": false,
    "<C-x>": false,
    "<C-n>": false,
    "<C-w>": false,
    "<C-y>": false,
    "<C-c>": false,
    "<C-v>": false
  },
  "vim.hlsearch": true,
  "vim.incsearch": true,
  "vim.leader": "<space>",
  "vim.insertModeKeyBindings": [],
  "vim.insertModeKeyBindingsNonRecursive": [],
  "vim.normalModeKeyBindings": [
    {
      "before": [
        "f",
        "w"
      ],
      "after": [
        "\"",
        "a",
        "y",
        "i",
        "w",
        "/",
        "<c-R>",
        "a",
        "<CR>"
      ],
      "silent": true
    },
    {
      "before": [
        "<leader>",
        "f"
      ],
      "commands": [
        "workbench.action.quickOpen"
      ],
      "silent": true
    },
    {
      "before": [
        "<leader>",
        "s"
      ],
      "commands": [
        "workbench.action.gotoSymbol"
      ],
      "silent": true
    },
    {
      "before": [
        "<leader>",
        "w"
      ],
      "commands": [
        "search.action.openEditor"
      ],
      "silent": true
    },
    {
      "before": [
        "<leader>",
        "j"
      ],
      "after": [
        "<leader>",
        "<leader>",
        "/"
      ],
      "silent": true
    },
    {
      "before": [
        "<leader>",
        "e"
      ],
      "commands": [
        "workbench.view.explorer"
      ],
      "silent": true
    },
    {
      "before": [
        "<leader>",
        "v"
      ],
      "commands": [
        "workbench.action.toggleSidebarVisibility"
      ],
      "silent": true
    },
    {
      "before": [
        "<leader>",
        "o"
      ],
      "commands": [
        "outline.focus",
        "outline.focus"
      ],
      "silent": true
    },
    {
      "before": [
        "<leader>",
        "h"
      ],
      "commands": [
        ":nohl"
      ]
    },
    {
      "before": [
        "<leader>",
        "<leader>",
        "f"
      ],
      "commands": [
        "editor.action.formatDocument"
      ]
    },
    {
      "before": [
        "<leader>",
        "r"
      ],
      "commands": [
        "editor.action.referenceSearch.trigger"
      ]
    },
    {
      "before": [
        "<leader>",
        "R"
      ],
      "commands": [
        "references-view.findReferences"
      ]
    },
    {
      "before": [
        "<leader>",
        "p",
        "k"
      ],
      "commands": [
        "editor.action.marker.prev"
      ]
    },
    {
      "before": [
        "<leader>",
        "p",
        "j"
      ],
      "commands": [
        "editor.action.marker.next"
      ]
    },
    {
      "before": [
        "<leader>",
        "c",
        "k"
      ],
      "commands": [
        "cursorUndo"
      ]
    },
    {
      "before": [
        "<leader>",
        "<leader>",
        "l"
      ],
      "commands": [
        "workbench.action.editor.changeLanguageMode"
      ]
    },
    {
      "before": [
        "<leader>",
        "l",
        "v"
      ],
      "commands": [
        "extension.keyboardDancer.console.log.variable"
      ]
    },
    {
      "before": [
        "<leader>",
        "l",
        "s"
      ],
      "commands": [
        "extension.keyboardDancer.console.log.string"
      ]
    }
  ],
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": [
        "J"
      ],
      "commands": [
        "lineBreakInsert"
      ],
      "silent": true
    },
    {
      "before": [
        "K"
      ],
      "after": [
        "J"
      ],
      "silent": true
    },
    {
      "before": [
        "L"
      ],
      "after": [
        "$"
      ]
    },
    {
      "before": [
        "H"
      ],
      "after": [
        "^"
      ]
    }
  ],
  "vim.visualModeKeyBindings": [
    {
      "before": [
        ">"
      ],
      "commands": [
        "editor.action.indentLines"
      ]
    },
    {
      "before": [
        "<"
      ],
      "commands": [
        "editor.action.outdentLines"
      ]
    },
    {
      "before": [
        "f",
        "w"
      ],
      "after": [
        "\"",
        "a",
        "y",
        "/",
        "<c-R>",
        "a",
        "<CR>"
      ]
    },
    {
      "before": [
        "<leader>",
        "l",
        "v"
      ],
      "commands": [
        "extension.keyboardDancer.console.log.variable"
      ]
    },
    {
      "before": [
        "<leader>",
        "l",
        "s"
      ],
      "commands": [
        "extension.keyboardDancer.console.log.string"
      ]
    }
  ],
  "vim.visualModeKeyBindingsNonRecursive": [
    {
      "before": [
        "L"
      ],
      "after": [
        "$"
      ]
    },
    {
      "before": [
        "H"
      ],
      "after": [
        "^"
      ]
    },
    {
      "before": [
        "<leader>",
        "<leader>",
        "f"
      ],
      "commands": [
        "editor.action.formatSelection"
      ]
    },
    {
      "before": [
        "p"
      ],
      "after": [
        "p",
        "g",
        "v",
        "y"
      ]
    }
  ],
  "whichkey.bindings": [
    {
      "key": "e",
      "name": "Show tree/explorer view",
      "type": "conditional",
      "bindings": [
        {
          "key": "",
          "name": "default",
          "type": "command",
          "command": "workbench.view.explorer"
        },
        {
          "key": "when:sideBarVisible && explorerViewletVisible",
          "name": "Hide explorer",
          "type": "command",
          "command": "workbench.action.toggleSidebarVisibility"
        }
      ]
    },
    {
      "key": "o",
      "name": "Outline",
      "type": "conditional",
      "bindings": [
        {
          "key": "",
          "name": "default",
          "type": "command",
          "command": "extension.multiCommand.execute",
          "args": {
            "sequence": [
              "outline.focus",
              "outline.focus"
            ]
          }
        },
        {
          "key": "when:outlinerExplorerView.active && view.outline.visible",
          "name": "Hide outline",
          "type": "command",
          "command": "workbench.action.toggleAuxiliaryBar"
        }
      ]
    },
    {
      "key": "g",
      "name": "Source contrl",
      "type": "command",
      "command": "workbench.view.scm"
    },
    {
      "command": "workbench.action.quickOpen",
      "key": "f",
      "name": "Find file",
      "type": "command"
    },
    {
      "command": "workbench.view.search",
      "key": "F",
      "name": "Search Word",
      "type": "command"
    },
    {
      "command": "search.action.openEditor",
      "key": "w",
      "name": "New Search Editor",
      "type": "command"
    },
    {
      "command": "workbench.action.gotoSymbol",
      "key": "s",
      "name": "Search document symbol",
      "type": "command"
    },
    {
      "command": "workbench.action.showAllSymbols",
      "key": "S",
      "name": "Search project symbol",
      "type": "command"
    },
    {
      "command": "workbench.action.reopenClosedEditor",
      "key": "r",
      "name": "Reopen Closed Editor",
      "type": "command"
    },
    {
      "command": "workbench.action.closeOtherEditors",
      "key": "c",
      "name": "Close Other Tabs",
      "type": "command"
    },
    {
      "command": "editor.action.toggleMinimap",
      "key": "m",
      "name": "Toggle Minimap",
      "type": "command"
    }
  ]
}

```

## keybindings

see the `Feature Contributions` tab

## Installation

You can install this extension through the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=TheVoidsteppers.keyboard-dancer)

1.  Open **Extensions** sidebar panel in VS Code. `View → Extensions`

2.  Search for `keyboardDancer`

3.  Click **Install** to install the extension

6.  import your  Setttings when the prompt shown or  typeing  `Keyboard Dancer Keymap: Import Keyboard Dancer Setting` command from the Command Palette