# Next:
- [x] Upgrade dependencies
- [x] Fix upgrade issues (bad UI placements and non-reactive UI in some buttons)
- [x] Fix issue of adjacent keyboard view not showing when there's a modal in the back
- [x] Finish Implementing functionality for editing an expense
- [x] Add UI & Functionality for deleting an expense
- [x] Add UI & Functionality for adding an expense type
- [x] Add UI & Functionality for editing an expense type
- [x] Add UI & Functionality for deleting an expense type
- [x] Implement functionality for automatically categorizing an expense on add (find last name-matching expense)
- [x] Implement functionality for automatically updating counts for expense types
- [x] Try to make modals go up when keyboard is covering (edit expense and add + edit expense type)
- [x] Auto-focus on name when adding type
- [ ] Automatically "reload" expense types stats when entering settings, at most once a week
- [ ] Implement export functionality in settings
- [ ] Implement import functionality in settings
- [ ] Implement remoteDB + Sync (when pressing Done after editing the URL) functionality in settings

# Tests:
- [ ] Test adding duplicate expense types
- [ ] Test adding expenses with unicode
- [ ] Test name trimming expenses and expense types
- [ ] Test negative values for expenses
- [ ] Test CSV import/export with unicode (ç, ª, à, etc.)
- [ ] Test big CSV import/exports (100k rows)
- [ ] Test bigger simulator screens

# After app is working:
- [ ] Build simple website (with FAQ), showcase demo with Appetize.io
- [ ] Suggest using [Cloudant](https://cloudant.com/sign-up/) for easy data sync

# For much later:
- [ ] Consider enabling an option for using CouchBase
  - http://blog.yld.io/2016/07/05/building-a-offline-first-application-using-react-native-and-pouchdb/#.V7Nt5P4rKAw
  - https://github.com/couchbaselabs/react-native-couchbase-lite && http://www.couchbase.com/nosql-databases/couchbase-mobile

# In the future:
- [ ] macOS version, using http://electron.atom.io and/or http://nwjs.io and/or https://github.com/gabrielbull/react-desktop
- [ ] Apple Watch app, ask for cost + name (force today, and use auto-categorization)
