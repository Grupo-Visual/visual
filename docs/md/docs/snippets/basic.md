# P5 inline code

Create and manipulate some quadrilles.

> :P5 lib1=https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js, width=200, height=400
>
> const ROWS = 20;
> const COLS = 10;
> const LENGTH = 20;
> var quadrille;
> var clone;
> var x = 2, y = 2;
> 
> function setup() {
>   createCanvas(COLS * LENGTH, ROWS * LENGTH);
>   quadrille = createQuadrille([[color('cyan'), '👽',             0    ],
>                                [0,             '🤔',            '🙈' ],
>                                [0,             color('#770811'), 0   ],
>                                ['g',           'o',             'l'  ]
>                               ]);
>   quadrille.reflect();
>   clone = quadrille.clone();
>   clone.reflect();
> }
> 
> function draw() {
>   background('#060621');
>   drawQuadrille(quadrille, x, y, LENGTH, 2, 'green');
>   drawQuadrille(clone, 2, 8, LENGTH, 0);
> }

note that the above sketch code is included within the markdown itself like this:

```md
> :P5 lib1=https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js, width=200, height=400
>
> const ROWS = 20;
> const COLS = 10;
> const LENGTH = 20;
> var quadrille;
> var clone;
> var x = 2, y = 2;
> 
> function setup() {
>   createCanvas(COLS * LENGTH, ROWS * LENGTH);
>   quadrille = createQuadrille([[color('cyan'), '👽',             0    ],
>                                [0,             '🤔',            '🙈' ],
>                                [0,             color('#770811'), 0   ],
>                                ['g',           'o',             'l'  ]
>                               ]);
>   quadrille.reflect();
>   clone = quadrille.clone();
>   clone.reflect();
> }
> 
> function draw() {
>   background('#060621');
>   drawQuadrille(quadrille, x, y, LENGTH, 2, 'green');
>   drawQuadrille(clone, 2, 8, LENGTH, 0);
> }
```

# P5 instance mode

> :P5 sketch=/docs/sketches/colors.js, width=710, height=400

The markdown of the above sketch looks like this:

```markdown
> :P5 sketch=/docs/sketches/colors.js, width=710, height=400
```

and the `colors.js` [p5 instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode) like this:

```js | colors.js
var myp5 = new p5((p) => {
  const ROWS = 20;
  const COLS = 20;
  const LENGTH = 20;
  var quadrille;
  var clone;
  var x = 2, y = 2;

  p.setup = function () {
    p.createCanvas(COLS * LENGTH, ROWS * LENGTH);
    quadrille = p.createQuadrille([[p.color('cyan'), '👽',               0    ],
                                   [0,               '🤔',              '🙈' ],
                                   [0,               p.color('#770811'), 0   ],
                                   ['g',             'o',                'l' ]
                                  ]);
    clone = quadrille.clone();
    clone.reflect();
  };

  p.draw = function () {
    p.background('#007ACC');
    p.drawQuadrille(quadrille, x, y, LENGTH, 2, 'green');
    p.drawQuadrille(clone, 12, 2, LENGTH, 0);
  };

  p.keyPressed = function () {
    if (p.keyCode === p.LEFT_ARROW) {
      quadrille.reflect();
    } else if (p.keyCode === p.RIGHT_ARROW) {
      quadrille.rotate();
    }
    if (p.key === 'a') {
      x = x > 0 ? x - 1 : x;
    }
    if (p.key === 's') {
      x = x < COLS - quadrille.width ? x + 1 : x;
    }
    if (p.key === 'w') {
      y = y > 0 ? y - 1 : y;
    }
    if (p.key === 'z') {
      y = y < ROWS - quadrille.height ? y + 1 : y;
    }
  };
}, "colors"); // --> the id should be the same file name
```