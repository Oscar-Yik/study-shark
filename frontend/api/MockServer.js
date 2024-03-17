import { createServer, Model } from "miragejs"

let mirageServer;

export function startServer() {
  mirageServer = createServer({
    models: {
      topic: Model, 
      tag: Model,
    },

    seeds(server) {
      server.create("topic", { id: "1", title: "Phys901", isPublic: true, lastOpened: new Date(), description: "Random fake description very fake pretend this is a description" }); // Seed data
      server.create("topic", { id: "2", title: "Chem123", isPublic: false, lastOpened: new Date(), description: "idk what to write here bro" }); 
      server.create("topic", { id: "3", title: "Math049", isPublic: false, lastOpened: new Date(), description: "Man my neck hurts" }); 
      server.create("topic", { id: "4", title: "Cpsc304", isPublic: true, lastOpened: new Date(), description: "blah blah blah blah blah blah blah ahhhhhhhhhhhh" }); 
      server.create("topic", { id: "5", title: "Hello World", isPublic: false, lastOpened: new Date(), description: "someone save me im not creative enough to come up with these" }); 
      server.create("topic", { id: "6", title: "How to swim", isPublic: false, lastOpened: new Date(), description: "description here" }); 
      server.create("topic", { id: "7", title: "Bible studies", isPublic: true, lastOpened: new Date(), description: "description here 2" }); 

      server.create("tag", { name: "Physics", color: "#5F2EB3" });
      server.create("tag", { name: "Chemistry", color: "#FF7A8B" });
      server.create("tag", { name: "Math", color: "#22B0D2" });
      server.create("tag", { name: "Biology", color: "#399CFF" });
      server.create("tag", { name: "Waves", color: "#9D3CA1" });
      server.create("tag", { name: "Showering", color: "#5F2EB3" });
    },

    // ROUTES 
    // - Oscar pls ignore the code inside the route, they dont actually reflect what the backend should do
    // - each route has a path as well as a comment describing what it should return. you should use
    //   as an interface to the backend api. 
    // - Some routes will have an example variable showing what fields are requried, for the ones without examples, 
    //   return the entire entity with all of its fields.
    // - None of these routes are actually complete, they all need user authentication which i have not yet included.
    routes() {
      this.namespace = ""; 

      // TOPIC -------------------------------
      // Return all topics for a given user
      this.get("/topic", (schema) => {
        return schema.topics.all();
      });

      // look at hardcoded example below
      this.get("/topic/home-page", (schema) => {
        const example = [
          {
            id: "1", // topic id
            title: "Phys901", // topic title
            isPublic: true, // topic isPublic
            date: "March 19, 2024", // lastOpened
            numNotes: 3, // count studymaterail of type "Notes" within this topic
            numCards: 5, // count studymaterail of type "Flashcard" within this topic
            numQuizzes: 2, // count studymaterail of type "Quiz" within this topic
            color: "purple", // topic color
          },
          {
            id: "2",
            title: "Chem123",
            isPublic: false,
            date: "March 23, 2024",
            numNotes: 21,
            numCards: 7,
            numQuizzes: 11,
            color: "pink",
          },
          {
            id: "3",
            title: "Math049",
            isPublic: false,
            date: "April 9, 2049",
            numNotes: 49,
            numCards: 49,
            numQuizzes: 49,
            color: "blue",
          },
          {
            id: "4",
            title: "Cpsc304",
            isPublic: true,
            date: "March 14, 2024",
            numNotes: 11,
            numCards: 210,
            numQuizzes: 3,
          },
          {
            id: "5",
            title: "Hello World",
            isPublic: false,
            date: "January 29, 2025",
            numNotes: 23,
            numCards: 10,
            numQuizzes: 78,
          },
          {
            id: "6",
            title: "How to swim",
            isPublic: false,
            date: "tee hee im not a date",
            numNotes: 34,
            numCards: 3,
            numQuizzes: 5,
          },
          {
            id: "7",
            title: "Bible Studies",
            isPublic: true,
            date: "December 25, 5 BC",
            numNotes: 5,
            numCards: 3,
            numQuizzes: 13,
          },
        ];
        return (example);
      });

      // Return topic by id
      this.get("/topic/:id/general-info", (schema, request) => {
        const example = {
          id: "1", // topic id
          title: "Phys901", // topic title
          description: "description here", // topic description
        }

        const { id } = request.params;
        return schema.topics.find(id); 
      });

      // Given a topic id, Return all tags associated the topic
      this.get("topic/:id/tags", (schema, request) => {
        return schema.tags.all(); // fake data, currently returns all tags, doing this just for simplicity
      });

      // Given a topic id, returns its sorted and filtered study material. 
      // Query Params: 
      //    type: string, is either "Notes", "Flashcards", "Quiz", or "None". if not "None", filter by type
      //    sort: string, is either "true" or "false", If true, sort alphabetically
      this.get("topic/:id/studymaterial/?type=<type>&sort=<sort>", (schema, request) => {
        const example = [
          {
            title: "Wave Interference", // studymaterial title
            type: "Notes", // studymaterial type
            lastOpened: Date() // studymaterial lastOpened: this is a date object
          }
        ]
      });

      // given a topic id and studymaterial title, delete the studymaterial
      this.delete("topic/:id/studymaterial/:title", (schema, request) => {
        // blank
      });
    },
  });
}

export function stopServer() {
  if (mirageServer) {
    mirageServer.shutdown();
    mirageServer = null;
  }
}
