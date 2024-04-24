import note from "../models/noteSchema.js";
import PDFDocument from "pdfkit";

export const createPost = async (req, res) => {
    try {
        const { chapter, subject, description } = req.body;
        const author = req.user;
        const isSubscribed = req.user && req.user.isSubscribed;
        console.log(chapter,subject,description)

    

        if (isSubscribed) {
            const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
            const newPostData = {
                chapter,
                subject,
                description,
                author: author,
                imageUrl: imageUrl
            };
            const newPost = new note(newPostData);
            await newPost.save();
            console.log('New post created:', newPost);
            return res.status(201).json({ newPost });
        } else {
            const newPostData = {
                chapter,
                subject,
                description,
                author: author
            };
            const newPost = new note(newPostData);
            await newPost.save();
            console.log('New post created without image:', newPost);
            return res.status(201).json({ newPost });
        }
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

  
  

export const getNotesById=async(req,res)=>{
    try{
        const id = req.query.id;
       const userId=req.user;

       const post= await note.findById(id);
       if(!post){
        return res.status(404).json({message:"note doesnt exist"})
       }

       if(post.author.toString()!==userId.toString()){
        return res.status(404).json({ error: "Unauthorized access" });
    }

    return res.status(201).json({post});

}
catch(error){
    console.log(error)
}
}

export const getNotes = async (req, res) => {
    try {
      const userId = req.user; 
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 6;
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
  
      const notes = await note.find({ author: userId })
        .skip(startIndex)
        .limit(pageSize);
  
      if (!notes || notes.length === 0) {
        return res.status(404).json({ message: "No notes found" });
      }
  
      return res.status(200).json({ notes });
    } catch (error) {
      console.error("Error fetching notes:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
export const updateNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; 
        const post = await note.findByIdAndUpdate(id, updateData, { new: true });
        if (!post) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json({ post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};





export const getPdfNote = async (req, res) => {
    try {
        const id = req.query.id;
        const existingNote = await note.findById(id);

        if (!existingNote) {
            return res.status(404).json({ message: "Note data not found" });
        }

        const doc = new PDFDocument(); 
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=${existingNote.subject}.pdf`);
        doc.pipe(res);   
        doc.font('Helvetica-Bold').fontSize(25).text('Note Details', { underline: true });
        doc.fontSize(16).text(`Subject: ${existingNote.subject}`);
        doc.fontSize(16).text(`Chapter: ${existingNote.chapter}`);
        doc.fontSize(16).text(`Description: ${existingNote.description}`);      
        doc.end();
        console.log("PDF generated and streamed to response");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const deleteNote=async(req,res)=>{
    try{
        const id=req.query.id;
        await note.findByIdAndDelete(id);
        return res.status(201).json({message:"deleted"})
    }
    catch(error){
        console.log(error);
    }
}