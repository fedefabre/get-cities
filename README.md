# ASAPP Front End Challenge by Federico Fabre

All the requirements were developed using Angular in its latest version.
Some common libraries as **Material** and **NgRX** were used to achieve the requirements in the efficient way.

The Angular **CDK for virtual scrolling** was implemented to render just a few rows improving the performance and taking care of the memory.

The development considered the failures of the API. So some recalls where implemented until showing an error message.

The **Redux pattern** was necessary to unify the application state and thinking in future features that could be required in a hypothetical case.

---
# Starting the application

### One script starts all

- Clone this repository.
- Once cloned change directory within the project.
- Run `npm start`
  
**Thats all!** The script will install all the dependencies in the APP and in the API and then will start both simultaneously, opening both windows on your preferred explorer.

---

### UX Concerns

- Keeping the selected cities at the top of the list could be improved adding some chips over the input, which will show always the selecteds. Also adding an X on those chips will be quicker to remove favorites.

---
### Known issues for future releases

- When the user select a new favorite city and does a quick scroll before the city ends loading the new preference then some other cities appear randomly as selected.