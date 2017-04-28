# Next:
- [x] Upgrade dependencies
- [ ] Fix upgrade issues (bad UI placements and non-reactive UI in some buttons)
- [ ] Fix issue of adjacent keyboard view not showing when there's a modal in the back
- [ ] Finish Implementing functionality for editing an expense
- [ ] Add UI & Functionality for deleting an expense
- [ ] Add UI & Functionality for adding an expense type
- [ ] Add UI & Functionality for editing an expense type
- [ ] Add UI & Functionality for deleting an expense type
- [ ] Implement functionality in settings
- [ ] Implement functionality for automatically categorizing an expense (see previous name-matching, choose 80% or uncategorized)

# Tests:
- [ ] Test adding duplicate expense types
- [ ] Test adding expenses with unicode
- [ ] Test name trimming expenses and expense types
- [ ] Test negative values for expenses
- [ ] Test CSV import/export with unicode (ç, ª, à, etc.)
- [ ] Test big CSV import/exports (100k rows)

# After app is working:
- [ ] Build simple website (with FAQ), showcase demo with Appetize.io
- [ ] Add instructions for how to setup CouchDB on Heroku, AWS, Google Cloud, or DigitalOcean

# For much later:
- [ ] Consider enabling an option for using CouchBase
  - http://blog.yld.io/2016/07/05/building-a-offline-first-application-using-react-native-and-pouchdb/#.V7Nt5P4rKAw
  - https://github.com/couchbaselabs/react-native-couchbase-lite && http://www.couchbase.com/nosql-databases/couchbase-mobile

# In the future:
- [ ] macOS version, using http://electron.atom.io and/or http://nwjs.io and/or https://github.com/gabrielbull/react-desktop
- [ ] Apple Watch app, ask for cost + name (force today, and use auto-categorization)
