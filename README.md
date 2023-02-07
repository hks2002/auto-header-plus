<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-02-04 20:34:47
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-02-04 20:35:05
* @FilePath              : auto-header-plus/README.md
* @CopyRight             : MerBleueAviation
-->

# Auto Header

![Logo](https://github.com/hks2002/auto-header-plus/raw/master/images/icon.png)

![Github Version](https://img.shields.io/github/package-json/v/hks2002/auto-header-plus) ![Github Build Status](https://img.shields.io/github/actions/workflow/status/hks2002/auto-header-plus/Build.yml) ![GitHub License](https://img.shields.io/github/license/hks2002/auto-header-plus) ![GitHub Starts](https://img.shields.io/github/stars/hks2002/auto-header-plus)
![VS marketplace Version](https://img.shields.io/visual-studio-marketplace/v/MerBleueAviation.auto-header-plus) ![downloads](https://img.shields.io/visual-studio-marketplace/d/MerBleueAviation.auto-header-plus) ![installs](https://img.shields.io/visual-studio-marketplace/i/MerBleueAviation.auto-header-plus) ![rating](https://img.shields.io/visual-studio-marketplace/r/MerBleueAviation.auto-header-plus)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

[English](./README.md) | [简体中文](./README.zh-cn.md)

This extension let you automatically add a header to the top of the current file. The supported comment style as bellow:

- Javascript、Java、 go、 C++、 C、C#、php、rust、solidity

```
/*
* @Author      : MerBleueAviation
* @Date        : 2018-09-27 13:55:00
* @LastEditors : MerBleueAviation
* @LastEditTime: 2018-11-08 16:10:19
*/
```

- html、vue、markdown

```
<!--
* @Author      : MerBleueAviation
* @Date        : 2018-09-27 13:55:00
* @LastEditors : MerBleueAviation
* @LastEditTime: 2018-11-08 16:10:19
-->
```

- python

```
'''
@Author      : MerBleueAviation
@Date        : 2018-09-27 13:55:00
@LastEditors : MerBleueAviation
@LastEditTime: 2018-11-08 16:10:19
'''
```

- vba

```
'
' @Author      : MerBleueAviation
' @Date        : 2018-09-27 13:55:00
' @LastEditors : MerBleueAviation
' @LastEditTime: 2018-11-08 16:10:19
'
```

- shellscript

```
###
# @Author      : MerBleueAviation
# @Date        : 2018-09-27 13:55:00
# @LastEditors : MerBleueAviation
# @LastEditTime: 2018-11-08 16:10:19
###
```

- lua

```
--[[
@Author      : MerBleueAviation
@Date        : 2018-09-27 13:55:00
@LastEditors : MerBleueAviation
@LastEditTime: 2018-11-08 16:10:19
--]]
```

## Features

- Support custom comment element, except preset: `Author`,`CreatedDate`,`LastEditors`,`LastEditDate`,`FilePath`,`CopyRight`，`additionalComment`，It could add your customer element, for example: `Version`,`Description`。

- Support custom header comment style, support the following variables:

  - First Line: `firstLineStart`, `firstLineMiddle`, `firstLineEnd`
  - Middle Line: `middleLineStart`, `commentElementPrefix`, `commentElementSuffix`, `middleLineEnd`,
  - Last Line: `lastLineStart`, `lastLineMiddle`, `lastLineEnd`
  - Others: `commentElementWidth`,`lineWidth`, `dateFormat`。

- Support set comment element value to `Command` result: `git config user.name`，`git config user.email`， `cat license.md`， or special value: `MODIFIEDDATE`, `CREATEDDATE`, `FULLPATH`, `RELATIVEPATH`, `SHORTNAMEPATH`。

- Easy configuration, you can set them in the settings UI or `settings.json`。
  ![ui](https://github.com/hks2002/auto-header-plus/raw/master/images/ui.png)

  It can achieve the following effects after configurate:

```
/***************************************
* @Author      : MerBleueAviation      *
* @Date        : 2018-09-27 13:55:00   *
* @LastEditors : MerBleueAviation      *
* @LastEditTime: 2018-11-08 16:10:19   *
* @FilePath    : RelativePath          *
* @Version     : 1.0.0                 *
* @Description :                       *
*                                      *
* Additional comments:                 *
* Some license information from file:  *
* balabala  balabala                   *
***************************************/
```

## Extension Settings

```
  enableAutoAddOnSave: true,
  enableAutoAddOnNew: true,
  allowCreateTimeDiff: true,
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  commentElements: [
    'Author',
    'CreatedDate',
    'LastEditors',
    'LastEditDate',
    'FilePath',
    'CopyRight'
  ],
  commentElementsValue: {
    Author: '${git config user.name}<${git config user.email}>',
    CreatedDate: 'CreatedDate',
    LastEditors: '${git config user.name}<${git config user.email}>',
    LastEditDate: 'ModifiedDate',
    FilePath: 'RelativePath',
    CopyRight: ''
  },
  customCommentElementsValue: { YourCustomcommentElement1: '' },
  style: {
    '0': {
      enable: true,
      applyTo: 'c|cpp|h|hpp|cs|java|js|ts|go|php|rs',
      firstLineStart: '/**',
      firstLineMiddle: '*',
      firstLineEnd: '*',
      middleLineStart: ' * ',
      commentElementPrefix: '@',
      commentElementSuffix: ': ',
      middleLineEnd: '',
      lastLineStart: ' *',
      lastLineMiddle: '*',
      lastLineEnd: '*/',
      commentElementWidth: 25,
      lineWidth: 80
    }
  },
  additionalComment: '',
  enableStyleSymbolCheck: true,
  logLevel: 'INFO'
```

If you need to add a new comment style, you can add a new style in `style`:

```
  '6': {
    enable: true,
    applyTo: 'unknown',
    firstLineStart: "'''",
    firstLineMiddle: '',
    firstLineEnd: '',
    middleLineStart: "''' ",
    commentElementPrefix: '@',
    commentElementSuffix: ': ',
    middleLineEnd: '',
    lastLineStart: "'''",
    lastLineMiddle: '',
    lastLineEnd: '',
    commentElementWidth: 25,
    lineWidth: 80
  }
```

> Note that the style number `6` must be unique，`0`->`5` are preset and reserved by extension.

## Extension Commands

This extension contributes the command: `Add Header` to the Command Palette.
bind key:

- win: `ctrl+alt+h`
- mac: `cmd+alt+h`
- linux: `ctrl+alt+h`

**Enjoy!**
