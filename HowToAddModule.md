
I Need to remember how to add new modules and load them in! So here's how.


In the modules .js, add this

export const moduleData = {
  id: "notes",
  icon: "📝",
  title: "Notes",
  desc: "Quickly jot down ideas and reminders.",
  entry: "./js/modules/notes/index.html"
};



HOW TO RUN BLOBE FOR NEW
Go to folder
chmod +x install.sh
./install.sh