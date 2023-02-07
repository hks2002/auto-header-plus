<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-02-04 20:35:52
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-02-04 20:35:52
* @FilePath              : auto-header-plus/README.zh-cn.md
* @CopyRight             : MerBleueAviation
-->

# Auto Header

![Logo](https://github.com/hks2002/auto-header-plus/raw/master/images/icon.png)

![Github Version](https://img.shields.io/github/package-json/v/hks2002/auto-header-plus) ![Github Build Status](https://img.shields.io/github/actions/workflow/status/hks2002/auto-header-plus/Build.yml) ![GitHub License](https://img.shields.io/github/license/hks2002/auto-header-plus) ![GitHub Starts](https://img.shields.io/github/stars/hks2002/auto-header-plus)
![VS marketplace Version](https://img.shields.io/visual-studio-marketplace/v/MerBleueAviation.auto-header-plus) ![downloads](https://img.shields.io/visual-studio-marketplace/d/MerBleueAviation.auto-header-plus) ![installs](https://img.shields.io/visual-studio-marketplace/i/MerBleueAviation.auto-header-plus) ![rating](https://img.shields.io/visual-studio-marketplace/r/MerBleueAviation.auto-header-plus)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

[English](./README.md) | [简体中文](./README.zh-cn.md)

此扩展可以自动为文件添加头部注释， 注释风格支持以下形式:

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

## 功能

- 自定义注释元素，除了预设的: `Author`,`CreatedDate`,`LastEditors`,`LastEditDate`,`FilePath`,`CopyRight`，`additionalComment`，还可以自定义注释元素，如: `Version`,`Description`等。

- 自定义头部注释风格，支持以下变量:

  - 首行: `firstLineStart`, `firstLineMiddle`, `firstLineEnd`
  - 中间行: `middleLineStart`, `commentElementPrefix`, `commentElementSuffix`, `middleLineEnd`,
  - 末行: `lastLineStart`, `lastLineMiddle`, `lastLineEnd`
  - 其他: `commentElementWidth`,`lineWidth`, `dateFormat`。

- 支持`命令行`结果和特殊值`MODIFIEDDATE`, `CREATEDDATE`, `FULLPATH`, `RELATIVEPATH`, `SHORTNAMEPATH`作为注释元素的值，如: `git config user.name`，`git config user.email`， `cat license.md`。

- 配置方便，可以直接在 UI 界面配置，也可以在`settings.json`中配置。
  ![ui.zh-cn](https://github.com/hks2002/auto-header-plus/raw/master/images/ui.zh-cn.png)

通过配置，可以实现以下效果：

- 注释方块

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

import * as vscode from 'vscode'
import packageJson from '../package.json'
```

- 非首行注释

```
import * as vscode from 'vscode'
import packageJson from '../package.json'

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

## 扩展设置

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

如果需要增加注释风格，可以在`style`中增加新的风格，如:

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

> 注意风格编号`6`不能重复,`0`->`5`是插件预设保留的。

## 扩展命令

扩展提供了如下命令: `Add Header`，可以通过快捷键调用, 快捷键:

- win: `ctrl+alt+h`
- mac: `cmd+alt+h`
- linux: `ctrl+alt+h`

**欢迎使用!**
