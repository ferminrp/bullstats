// gray-matter to read the .md files better
const matter = require('gray-matter');
const md = require("markdown-it")();
const fs = require("fs");

/* Instrucciones https://dev.to/khalby786/creating-a-markdown-blog-with-ejs-express-j40 */

module.exports = {
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

            const posts = fs.readdirSync('./glosario').filter(file => file.endsWith('.md'));
            res.render("glosario", {
              posts: posts
            });

    }
};
