// gray-matter to read the .md files better
const matter = require('gray-matter');
const md = require("markdown-it")();
const fs = require("fs");

/* Instrucciones https://dev.to/khalby786/creating-a-markdown-blog-with-ejs-express-j40 */

let glosarioController = {
	definicion: (req, res) => {
		    // read the markdown file
            const file = matter.read('./glosario/' + req.params.article + '.md');
  
            // use markdown-it to convert content to HTML
        
            let content = file.content;
            var result = md.render(content);
          
            res.render("definicion", {
              post: result,
              title: file.data.title,
              description: file.data.description,
              image: file.data.image
            });
	},
    glosario: (req, res) => {
            /* Creo un array de todos los posteos */
            const posts = fs.readdirSync('./glosario').filter(file => file.endsWith('.md'));

            /* Creo un array donde voy a guardar los titulos de los posteos */
            let titles = []

            /*Por cada posteo tomo el titulo y lo guardo en el array de titulos */
            for (post in posts) {
              titles.push(glosarioController.getPostTitle( posts[post] ))
            }

            /* Creo un objeto juntando posts y titles */

            let combinado = {};
            posts.forEach((key, i) => combinado[key] = titles[i]);

            console.log(combinado);

            res.render("glosario", {
              posts: posts,
              titles: titles
            });

    },
  getPostTitle: (postFileName) => {
    const file = matter.read('./glosario/' + postFileName);
    return file.data.title
  }
};

module.exports = glosarioController;
