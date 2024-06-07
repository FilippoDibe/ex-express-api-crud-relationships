const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const create = async (req, res) => {
    const { title, slug, content, published } = req.body;
    const data = {
      title,
      slug,
      content,
      published,
    };
  
    try {
      const post = await prisma.post.create({ data });
      res.status(200).send(post);
    } catch (err) {
      console.error("Errore durante la creazione del post:", err);
      res.status(500).json({ err: "Si è verificato un errore durante la creazione del post." });
    }
  };

const showBySlug = async(req, res) => {
    try{
        const {slug} = req.params;
        const post = await prisma.post.findUnique({
            where: {slug},
            
        });
        if (post) {
            res.json(post);
        }else{
            return res.status(404).json({ error: 'Post non trovato.' });
 
        }

    }catch (err){
        res.status(500).json({ error: 'Si è verificato un errore durante il recupero del post.' });

    }
};

const index = async (req, res) => {
    const {published, search} = req.query;
    try {
        const posts = await prisma.post.findMany({
          where: {
            AND: [
              published !== undefined ? { published: published === 'true' } : {},
              search ? {
                OR: [
                  { title: { contains: search, mode: 'bologna' } },
                  { content: { contains: search, mode: 'bologna' } }

                ]
              } : {}
            ]
          },
        });
        res.json(posts);
      } catch (error) {
        res.status(500).json({ error: 'Si è verificato un errore durante il recupero dei post.' });
      }
};

const update = async (req, res) => {
    try{
        const {slug} = req.params;
        const post = await prisma.post.update({
            where: {slug},
            data: req.body,
        });
        res.json(post);
    }catch(err){
        res.status(500).json({ error: 'Si è verificato un errore durante aggiornamento dei postt.' });

    }
}

const destroy = async(req, res) => {
    const {slug} = req.params;
    await prisma.post.delete({
        where : {slug},
    });
    res.json(`post ${slug} eliminato con successo`)
}


module.exports = {
    create,
    index,
    showBySlug,
    update,
    destroy
}