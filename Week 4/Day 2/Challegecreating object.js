class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
  }
}

// First instance
const video1 = new Video("JS Basics", "John Doe", 300);
video1.watch();

//  Second instance
const video2 = new Video("Advanced CSS", "Jane Smith", 600);
video2.watch();

// --- Bonus: Array of data and Looping ---

// Best data structure for this is an array of objects
const videoData = [
  { title: "React Tutorial", uploader: "CodeMaster", time: 1200 },
  { title: "Node.js Guide", uploader: "BackendExpert", time: 900 },
  { title: "HTML Crash Course", uploader: "WebDev", time: 450 },
  { title: "Python for Beginners", uploader: "PyPro", time: 1500 },
  { title: "UI/UX Tips", uploader: "DesignGuru", time: 350 }
];

// Loop through the array to instantiate and call watch()
const videoInstances = videoData.map(data => {
  const newVideo = new Video(data.title, data.uploader, data.time);
  newVideo.watch();
  return newVideo;
});
