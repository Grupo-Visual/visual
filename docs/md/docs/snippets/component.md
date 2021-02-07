# Codedoc P5 markdown component

Component used to display the [p5.js](https://p5js.org) code snippets found in this site. Supports inline code (code within the markdown), sound, both [global and instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode), versioning, and up to 5 community libraries.

## Syntax

> \> :P5 [sketch] [width] [height] [sound] [version] [lib1] [lib2] [lib3] [lib4] [lib5]

## Parameters

| <!-- --> | <!-- -->                                                                                                          |
|----------|-------------------------------------------------------------------------------------------------------------------|
| sketch   | path to p5 sketch either in global or instance mode. The sketch file name should equaks the "id" in instance mode |
| width    | Sketch width default is 800                                                                                       |
| height   | Sketch height default is 600                                                                                      |
| sound    | Either *true* or *false*                                                                                          |
| version  | p5js version default is 1.2.0                                                                                     |
| lib1     | path to community library 1. Either provided locally or by a CDN                                                  |
| lib2     | path to community library 2. Either provided locally or by a CDN                                                  |
| lib3     | path to community library 2. Either provided locally or by a CDN                                                  |
| lib4     | path to community library 2. Either provided locally or by a CDN                                                  |
| lib5     | path to community library 2. Either provided locally or by a CDN                                                  |