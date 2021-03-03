# Codedoc P5 markdown component

Component used to display the [p5.js](https://p5js.org) code snippets found in this site. Supports inline code (code within the markdown), sound, both [global and instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode), versioning, and up to 5 community libraries.

## Syntax

> \> :P5 [sketch] [width] [height] [p5lib] [p5sound] [version] [sound] [lib1] [lib2] [lib3] [lib4] [lib5]

## Parameters

| <!-- --> | <!-- -->                                                         |
|----------|------------------------------------------------------------------|
| sketch   | path to p5 sketch either in global or instance mode. The sketch file name should equals the "id" in instance mode. Default is to use the inlined code found within the markdown |
| width    | Sketch width. Default is 800                                     |
| height   | Sketch height. Default is 600                                    |
| p5lib    | path to p5.js lib. Either provided locally or by a CDN. Use it for debugging or developping offline. Default is to use p5.min.js CDN according to the `version` param |
| p5sound  | path to p5.sound.js lib. Either provided locally or by a CDN. Use it for debugging or developping offline. Default is to use p5.sound.min.js CDN according to the `version` param |
| version  | p5.min.js and p5.sound.min.js version default is 1.2.0           |
| sound    | Either *true* or *false* default is false                        |
| lib1     | path to community library 1. Either provided locally or by a CDN |
| lib2     | path to community library 2. Either provided locally or by a CDN |
| lib3     | path to community library 3. Either provided locally or by a CDN |
| lib4     | path to community library 4. Either provided locally or by a CDN |
| lib5     | path to community library 5. Either provided locally or by a CDN |

> :ToCPrevNext