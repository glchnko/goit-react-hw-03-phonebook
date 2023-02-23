import React, {Component} from "react";
import ContactForm from "components/ContactForm/ContactForm";
import ContactList from "components/ContactList/ContactList";
import Filter from "components/Filter/Filter";



export default class App extends Component {
    state = {
        contacts: [
            { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
            { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
            { id: "id-3", name: "Eden Clements", number: "645-17-79" },
         
          ],
          filter: "",
    };


    addContact = (newContact) => {

        const newContacts  = [];
        const currentContacts = this.state.contacts;

        const isPresentContact = currentContacts.find(element => 
            element.name.toLowerCase() === newContact.name.toLowerCase()
        ) ? true: false;
        
        if (isPresentContact){
            alert(`${newContact.name} is already in contacts.`)
        } else {
            newContacts.push(...currentContacts);
            newContacts.push(newContact);
            this.setState({contacts: newContacts});
        }        
    };

    addFilter = (newFilter) => {
        this.setState({
            filter: newFilter,
        })
    };

    fileteredContacts = (filterName) => {
        const currentContacts = this.state.contacts;

        return currentContacts.filter(contact =>      
             contact.name.toLowerCase().includes(filterName.toLowerCase()))
    };

    deleteContact = (e) => {
        const currentContacts = this.state.contacts;
        const delContact = e.currentTarget.name;
        const newStateContacts = currentContacts.filter(element=> element.name !== delContact);
        this.setState(
           { contacts: newStateContacts } 
        );
    };

    componentDidMount(){       
        const LocalStoragePhonebook = localStorage.getItem('LocalPhonebook');
        const LocalPhonebook = JSON.parse(LocalStoragePhonebook);

        if (LocalPhonebook?.length) {
            this.setState({contacts: LocalPhonebook});
        }; 
    }

    componentDidUpdate (prevProps, prevState) {
        const prevConatcts = prevState.contacts;
        const currentContacts = this.state.contacts;

        if (currentContacts !== prevConatcts) {
            localStorage.setItem ('LocalPhonebook', JSON.stringify(currentContacts));
        }
    }


      render () {
        
        const filterStatus = this.state.filter;
        const currentContactList = this.state.contacts;
        const contactList = filterStatus ? this.fileteredContacts(filterStatus) : currentContactList;

        return (
        <div>
            <h1>Phonebook</h1>
            <ContactForm onSubmit = { res => this.addContact(res) } />
            <h2>Contacts</h2>
            <Filter onChange = { filter => this.addFilter(filter) } value={ filterStatus }/>
            <ContactList contacts={ contactList } onClick = { this.deleteContact }/>
        </div>
        )
    }
//     addContact = (task) => {
//         const searchSameName = this.state.contacts
//           .map((cont) => cont.name)
//           .includes(task.name);
    
//         if (searchSameName) {
//           alert(`${task.name} is already in contacts`);
//         } else if (task.name.length === 0) {
//           alert("Fields must be filled!");
//         } else {
//           const contact = {
//             ...task,
//             id: uuidv4(),
//           };
    
//           this.setState((prevState) => ({
//             contacts: [...prevState.contacts, contact],
//           }));
//         }
//       };
    
//       changeFilter = (filter) => {
//         this.setState({ filter });
//       };
    
//       getVisibleContacts = () => {
//         const { contacts, filter } = this.state;
    
//         return contacts.filter((contacts) =>
//           contacts.name.toLowerCase().includes(filter.toLowerCase())
//         );
//       };
    
//       removeContact = (contactId) => {
//         this.setState((prevState) => {
//           return {
//             contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//           };
//         });
//       };
    
//       render() {
//         const { filter } = this.state;
    
//         const visibleContacts = this.getVisibleContacts();
    
//         return (
//           <div>
//             <h1>Phonebook</h1>
    
//             <ContactForm onAddContact={this.addContact} />
//             <h2>Contacts</h2>
//             {visibleContacts.length > 1 && (
//               <Filter value={filter} onChangeFilter={this.changeFilter} />
//             )}
//             {visibleContacts.length > 0 && (
//               <ContactList
//                 contacts={visibleContacts}
//                 onRemoveItem={this.removeContact}
//               />
//             )}
//           </div>
//         )
//      }   
}

