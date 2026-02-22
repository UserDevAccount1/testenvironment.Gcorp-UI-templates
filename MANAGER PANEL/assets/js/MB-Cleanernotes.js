/**
 * MB-CleanerNotes.js
 * Complete notes and task management system for MB Cleaner
 * Integrates with existing HTML structure
 */

(function($) {
    'use strict';

    const MBCleanerNotes = {
        // Store current data
        notes: [],
        tasks: [],
        validations: [],
        chatMessages: [],
        
        // Current user
        currentUser: 'manager',
        currentCleaner: 'John Martinez',
        
        // Media viewer state
        mediaViewerActive: false,

        /**
         * Initialize the application
         */
        init: function() {
            this.loadSampleData();
            this.bindEvents();
            this.renderNotes();
            this.renderTasks();
            this.updateProgress();
            this.renderChat();
            this.setupMediaViewer();
            this.setupRejectionModal();
        },

        /**
         * Load sample data (simulating API fetch)
         */
        loadSampleData: function() {
            // Client notes - automatically fetched
            this.notes = [
                {
                    id: 'note-1',
                    content: 'Client requests deep cleaning of kitchen cabinets - very greasy and needs special attention',
                    mediaType: 'image',
                    mediaFile: 'sample-image.jpg',
                    addedBy: 'client',
                    addedByName: 'Maria Santos',
                    date: '2025-02-20',
                    priority: 'high',
                    converted: false,
                    taskId: null
                },
                {
                    id: 'note-2',
                    content: 'Water stain on living room ceiling needs attention - possible leak from upstairs',
                    mediaType: 'image',
                    mediaFile: 'sample-image.jpg',
                    addedBy: 'client',
                    addedByName: 'Maria Santos',
                    date: '2025-02-21',
                    priority: 'urgent',
                    converted: true,
                    taskId: 'task-1'
                },
                {
                    id: 'note-3',
                    content: 'Client sent video of broken tile in bathroom - need to replace',
                    mediaType: 'video',
                    mediaFile: 'sample-video.mp4',
                    addedBy: 'client',
                    addedByName: 'Maria Santos',
                    date: '2025-02-21',
                    priority: 'high',
                    converted: true,
                    taskId: 'task-2'
                },
                {
                    id: 'note-4',
                    content: 'Please use eco-friendly products only - client has severe allergies',
                    mediaType: 'text',
                    mediaFile: null,
                    addedBy: 'client',
                    addedByName: 'Maria Santos',
                    date: '2025-02-19',
                    priority: 'normal',
                    converted: false,
                    taskId: null
                },
                {
                    id: 'note-5',
                    content: 'Extra attention to master bedroom closet organization - need to rearrange shelves',
                    mediaType: 'image',
                    mediaFile: 'sample-image.jpg',
                    addedBy: 'client',
                    addedByName: 'Maria Santos',
                    date: '2025-02-22',
                    priority: 'low',
                    converted: false,
                    taskId: null
                },
                {
                    id: 'note-6',
                    content: 'Check bathroom exhaust fan - making loud noise when operating',
                    mediaType: 'audio',
                    mediaFile: 'sample-audio.mp3',
                    addedBy: 'manager',
                    addedByName: 'Manager',
                    date: '2025-02-22',
                    priority: 'normal',
                    converted: false,
                    taskId: null
                },
                {
                    id: 'note-7',
                    content: 'Client requested additional steam clean for living room carpet',
                    mediaType: 'text',
                    mediaFile: null,
                    addedBy: 'client',
                    addedByName: 'Maria Santos',
                    date: '2025-02-23',
                    priority: 'normal',
                    converted: false,
                    taskId: null
                }
            ];

            // Tasks (converted notes + services)
            this.tasks = [
                {
                    id: 'task-1',
                    noteId: 'note-2',
                    title: 'Living Room Ceiling Water Stain Repair',
                    description: 'Water stain on living room ceiling - check for leaks and repair',
                    mediaType: 'image',
                    mediaFile: 'sample-image.jpg',
                    addedBy: 'client',
                    addedByName: 'Maria Santos',
                    date: '2025-02-21',
                    priority: 'urgent',
                    status: 'in-progress',
                    validationSubmitted: false,
                    validation: null
                },
                {
                    id: 'task-2',
                    noteId: 'note-3',
                    title: 'Bathroom Tile Replacement',
                    description: 'Replace broken tile in bathroom - need matching tile',
                    mediaType: 'video',
                    mediaFile: 'sample-video.mp4',
                    addedBy: 'client',
                    addedByName: 'Maria Santos',
                    date: '2025-02-21',
                    priority: 'high',
                    status: 'pending',
                    validationSubmitted: false,
                    validation: null
                },
                {
                    id: 'task-3',
                    noteId: null,
                    title: 'Maintenance Clean - Standard Package',
                    description: 'Regular maintenance cleaning for entire house (3 bedrooms, 2 baths)',
                    mediaType: 'text',
                    mediaFile: null,
                    addedBy: 'system',
                    addedByName: 'System',
                    date: '2025-02-20',
                    priority: 'normal',
                    status: 'completed',
                    validationSubmitted: true,
                    validation: {
                        status: 'approved',
                        note: 'All areas cleaned properly. Client satisfied.',
                        mediaFile: 'sample-image.jpg',
                        submittedDate: '2025-02-22'
                    }
                },
                {
                    id: 'task-4',
                    noteId: null,
                    title: 'Steam Clean - Living Room Carpet',
                    description: 'Deep steam cleaning for living room carpet',
                    mediaType: 'text',
                    mediaFile: null,
                    addedBy: 'system',
                    addedByName: 'System',
                    date: '2025-02-20',
                    priority: 'normal',
                    status: 'pending',
                    validationSubmitted: false,
                    validation: null
                }
            ];

            // Validations submitted by cleaner
            this.validations = [
                {
                    id: 'val-1',
                    taskId: 'task-1',
                    taskTitle: 'Living Room Ceiling Water Stain Repair',
                    cleanerNote: 'Applied stain blocker and repainted. Need to monitor if stain returns.',
                    mediaType: 'image',
                    mediaFile: 'sample-image.jpg',
                    submittedBy: 'cleaner',
                    submittedByName: 'John Martinez',
                    submittedDate: '2025-02-22',
                    status: 'pending'
                }
            ];

            // Chat messages
            this.chatMessages = [
                {
                    id: 'chat-1',
                    sender: 'manager',
                    senderName: 'Manager',
                    message: 'Please check the water stain in living room ceiling and let me know what you find',
                    timestamp: '2025-02-21 09:30 AM',
                    type: 'text'
                },
                {
                    id: 'chat-2',
                    sender: 'cleaner',
                    senderName: 'John Martinez',
                    message: 'Found water stain, applied stain blocker. Should I repaint the whole area?',
                    timestamp: '2025-02-21 02:15 PM',
                    type: 'text'
                },
                {
                    id: 'chat-3',
                    sender: 'manager',
                    senderName: 'Manager',
                    message: 'Yes, please repaint the entire ceiling section to match',
                    timestamp: '2025-02-21 02:30 PM',
                    type: 'text'
                },
                {
                    id: 'chat-4',
                    sender: 'cleaner',
                    senderName: 'John Martinez',
                    message: 'Completed repainting. Submitted validation with photos.',
                    timestamp: '2025-02-22 10:45 AM',
                    type: 'text'
                },
                {
                    id: 'chat-5',
                    sender: 'system',
                    senderName: 'System',
                    message: 'New validation submitted for task: Living Room Ceiling Water Stain Repair',
                    timestamp: '2025-02-22 10:46 AM',
                    type: 'system'
                }
            ];
        },

        /**
         * Bind all event listeners
         */
        bindEvents: function() {
            // Notes tab events
            $('#cleaner-add-note-btn').on('click', () => this.toggleNoteForm(true));
            $('#cleaner-cancel-note').on('click', () => this.toggleNoteForm(false));
            $('#cleaner-save-note').on('click', () => this.saveNewNote());
            
            // Search and filter events
            $('#cleaner-notes-search').on('keyup', () => this.filterNotes());
            $('#cleaner-notes-filter').on('change', () => this.filterNotes());
            
            // Task filters
            $('#cleaner-tasks-search').on('keyup', () => this.filterTasks());
            $('#cleaner-tasks-filter').on('change', () => this.filterTasks());
            $('#cleaner-tasks-status-filter').on('change', () => this.filterTasks());
            $('#cleaner-tasks-priority-filter').on('change', () => this.filterTasks());
            
            // Chat events
            $('#cleaner-send-chat').on('click', () => this.sendChatMessage());
            $('#cleaner-chat-input').on('keypress', (e) => {
                if (e.which === 13) this.sendChatMessage();
            });
            
            // Media viewer close
            $(document).on('click', '.cleaner-media-viewer-close', () => this.closeMediaViewer());
            $(document).on('click', '.cleaner-media-viewer-overlay', (e) => {
                if ($(e.target).hasClass('cleaner-media-viewer-overlay')) {
                    this.closeMediaViewer();
                }
            });

            // Modal close
            $(document).on('click', '.cleaner-modal-close', () => $('#cleaner-rejection-modal').hide());
            
            // Sample media clicks
            $(document).on('click', '.cleaner-sample-media-grid div', function() {
                const mediaFile = $(this).find('span').text();
                const mediaType = $(this).find('i').hasClass('fa-image') ? 'image' : 
                                 $(this).find('i').hasClass('fa-video') ? 'video' : 'audio';
                MBCleanerNotes.openMediaViewer(mediaFile, mediaType);
            });
        },

        /**
         * Toggle note form visibility
         */
        toggleNoteForm: function(show) {
            if (show) {
                $('#cleaner-add-note-form').slideDown();
                $('#cleaner-add-note-btn').hide();
            } else {
                $('#cleaner-add-note-form').slideUp();
                $('#cleaner-add-note-btn').show();
                this.clearNoteForm();
            }
        },

        /**
         * Clear note form
         */
        clearNoteForm: function() {
            $('#cleaner-new-note').val('');
            $('#cleaner-note-media-type').val('text');
            $('#cleaner-media-file').val('sample-image.jpg');
            $('#cleaner-note-added-by').val('manager');
            $('#cleaner-convert-to-task').prop('checked', false);
        },

        /**
         * Save new note (manager only)
         */
        saveNewNote: function() {
            const content = $('#cleaner-new-note').val().trim();
            if (!content) {
                this.showNotification('Please enter note content', 'error');
                return;
            }

            const mediaType = $('#cleaner-note-media-type').val();
            const mediaFile = $('#cleaner-media-file').val().trim();
            
            const newNote = {
                id: 'note-' + Date.now(),
                content: content,
                mediaType: mediaType,
                mediaFile: mediaFile || (mediaType !== 'text' ? 'sample-image.jpg' : null),
                addedBy: 'manager',
                addedByName: 'Manager',
                date: new Date().toISOString().split('T')[0],
                priority: 'normal',
                converted: false,
                taskId: null
            };

            this.notes.push(newNote);

            // Convert to task if checkbox is checked
            if ($('#cleaner-convert-to-task').is(':checked')) {
                this.convertNoteToTask(newNote.id);
            }

            this.renderNotes();
            this.renderTasks();
            this.updateProgress();
            this.toggleNoteForm(false);
            this.showNotification('Note saved successfully', 'success');
        },

        /**
         * Convert note to task
         */
        convertNoteToTask: function(noteId) {
            const note = this.notes.find(n => n.id === noteId);
            if (!note || note.converted) return;

            const newTask = {
                id: 'task-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
                noteId: note.id,
                title: note.content.substring(0, 50) + (note.content.length > 50 ? '...' : ''),
                description: note.content,
                mediaType: note.mediaType,
                mediaFile: note.mediaFile,
                addedBy: note.addedBy,
                addedByName: note.addedByName,
                date: note.date,
                priority: note.priority || 'normal',
                status: 'pending',
                validationSubmitted: false,
                validation: null
            };

            this.tasks.push(newTask);
            note.converted = true;
            note.taskId = newTask.id;
            
            this.showNotification('Note converted to task successfully', 'success');
            this.renderTasks();
        },

        /**
         * Edit note
         */
        editNote: function(noteId) {
            const note = this.notes.find(n => n.id === noteId);
            if (!note) return;

            // Populate form with note data
            $('#cleaner-new-note').val(note.content);
            $('#cleaner-note-media-type').val(note.mediaType);
            $('#cleaner-media-file').val(note.mediaFile || '');
            $('#cleaner-note-added-by').val(note.addedBy);
            $('#cleaner-convert-to-task').prop('checked', false);
            
            // Show form
            this.toggleNoteForm(true);
            
            // Remove old note and add as new on save
            $('#cleaner-save-note').off('click').on('click', () => {
                this.notes = this.notes.filter(n => n.id !== noteId);
                this.saveNewNote();
            });
        },

        /**
         * Delete note
         */
        deleteNote: function(noteId) {
            if (!confirm('Are you sure you want to delete this note?')) return;
            
            const note = this.notes.find(n => n.id === noteId);
            if (note && note.converted) {
                // Also delete associated task
                this.tasks = this.tasks.filter(t => t.id !== note.taskId);
            }
            
            this.notes = this.notes.filter(n => n.id !== noteId);
            this.renderNotes();
            this.renderTasks();
            this.updateProgress();
            this.showNotification('Note deleted successfully', 'success');
        },

        /**
         * Filter notes
         */
        filterNotes: function() {
            const searchTerm = $('#cleaner-notes-search').val().toLowerCase();
            const filterBy = $('#cleaner-notes-filter').val();

            const filteredNotes = this.notes.filter(note => {
                const matchesSearch = note.content.toLowerCase().includes(searchTerm) ||
                                     note.addedByName.toLowerCase().includes(searchTerm);
                const matchesFilter = filterBy === 'all' || note.addedBy === filterBy;
                return matchesSearch && matchesFilter;
            });

            this.renderNotesTable(filteredNotes);
        },

        /**
         * Render all notes
         */
        renderNotes: function() {
            $('#cleaner-notes-count').text(this.notes.length);
            this.renderNotesTable(this.notes);
        },

        /**
         * Render notes table
         */
        renderNotesTable: function(notesData) {
            const tbody = $('#cleaner-notes-table-body');
            tbody.empty();

            if (notesData.length === 0) {
                tbody.append('<tr><td colspan="7" style="text-align: center; padding: 2rem;">No notes found</td></tr>');
                return;
            }

            notesData.forEach((note, index) => {
                const mediaIcon = this.getMediaIcon(note.mediaType);
                const mediaLabel = this.getMediaLabel(note.mediaType);
                
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>
                            <div style="font-weight: 500; margin-bottom: 0.25rem;">${note.content}</div>
                            ${note.mediaFile ? `
                                <div style="margin-top: 0.5rem;">
                                    <span class="cleaner-media-preview" onclick="MBCleanerNotes.openMediaViewer('${note.mediaFile}', '${note.mediaType}')" 
                                          style="color: #3b82f6; cursor: pointer; font-size: 0.813rem; display: inline-flex; align-items: center; gap: 0.375rem;">
                                        <i class="fas ${mediaIcon}"></i> Preview ${mediaLabel}
                                    </span>
                                </div>
                            ` : ''}
                        </td>
                        <td>
                            <i class="fas ${mediaIcon}" style="margin-right: 0.375rem;"></i>
                            ${mediaLabel}
                        </td>
                        <td>
                            <span class="cleaner-badge cleaner-badge-${note.addedBy}">
                                ${note.addedByName}
                            </span>
                        </td>
                        <td>${note.date}</td>
                        <td>
                            ${note.converted ? 
                                '<span class="cleaner-badge cleaner-badge-success">Converted</span>' : 
                                `<button class="cleaner-btn cleaner-btn-xs cleaner-btn-primary" onclick="MBCleanerNotes.convertNoteToTask('${note.id}')">
                                    <i class="fas fa-tasks"></i> Convert
                                </button>`
                            }
                        </td>
                        <td>
                            <button class="cleaner-btn cleaner-btn-xs cleaner-btn-secondary" onclick="MBCleanerNotes.editNote('${note.id}')" style="margin-right: 0.25rem;">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="cleaner-btn cleaner-btn-xs cleaner-btn-danger" onclick="MBCleanerNotes.deleteNote('${note.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
                tbody.append(row);
            });
        },

        /**
         * Render tasks in task completion tab
         */
        renderTasks: function() {
            // Check if task table body exists
            if ($('#cleaner-tasks-table-body').length) {
                this.renderTasksTable(this.tasks);
            }
            
            // Update categories if container exists
            if ($('#cleaner-task-categories-container').length) {
                this.renderTaskCategories();
            }
            
            // Update validation list if exists
            if ($('#cleaner-validation-list').length) {
                this.renderValidationList();
            }
            
            // Render special tasks in breakdown
            this.renderSpecialTasks();
        },

        /**
         * Render tasks table
         */
        renderTasksTable: function(tasksData) {
            const tbody = $('#cleaner-tasks-table-body');
            if (!tbody.length) return;

            tbody.empty();

            if (tasksData.length === 0) {
                tbody.append('<tr><td colspan="6" style="text-align: center; padding: 2rem;">No tasks found</td></tr>');
                return;
            }

            tasksData.forEach((task, index) => {
                const mediaIcon = this.getMediaIcon(task.mediaType);
                const mediaLabel = this.getMediaLabel(task.mediaType);
                const statusClass = task.status === 'completed' ? 'cleaner-badge-success' : 
                                   task.status === 'in-progress' ? 'cleaner-badge-warning' : 'cleaner-badge-secondary';
                
                // Check if there's a validation for this task
                const validation = this.validations.find(v => v.taskId === task.id);

                const row = `
                    <tr>
                        <td style="padding: 1rem;">${index + 1}</td>
                        <td style="padding: 1rem;">
                            <div style="font-weight: 500; margin-bottom: 0.25rem;">${task.title}</div>
                            <div style="font-size: 0.813rem; color: #64748b;">${task.description.substring(0, 100)}${task.description.length > 100 ? '...' : ''}</div>
                        </td>
                        <td style="padding: 1rem;">
                            ${task.mediaFile ? `
                                <span class="cleaner-media-preview" onclick="MBCleanerNotes.openMediaViewer('${task.mediaFile}', '${task.mediaType}')" 
                                      style="color: #3b82f6; cursor: pointer; display: inline-flex; align-items: center; gap: 0.375rem;">
                                    <i class="fas ${mediaIcon}"></i> ${mediaLabel}
                                </span>
                            ` : '<span style="color: #64748b;">No media</span>'}
                        </td>
                        <td style="padding: 1rem;">${task.date}</td>
                        <td style="padding: 1rem;">
                            <span class="cleaner-badge ${statusClass}">${task.status}</span>
                        </td>
                        <td style="padding: 1rem;">
                            ${this.renderValidationCell(task, validation)}
                        </td>
                    </tr>
                `;
                tbody.append(row);
            });
        },

        /**
         * Render validation cell content
         */
        renderValidationCell: function(task, validation) {
            if (!validation) {
                return task.status === 'completed' ? 
                    '<span style="color: #64748b;">Awaiting validation</span>' : 
                    '<span style="color: #64748b;">Not submitted</span>';
            }

            if (validation.status === 'approved') {
                return '<span class="cleaner-badge cleaner-badge-success">Approved</span>';
            }

            if (validation.status === 'rejected') {
                return '<span class="cleaner-badge cleaner-badge-danger">Rejected</span>';
            }

            // Pending validation with approve/reject buttons
            return `
                <div style="background: #f8fafc; padding: 0.75rem; border-radius: 0.375rem; font-size: 0.813rem;">
                    <div><strong>Note:</strong> ${validation.cleanerNote.substring(0, 50)}...</div>
                    ${validation.mediaFile ? `
                        <div style="margin-top: 0.375rem;">
                            <span class="cleaner-media-preview" onclick="MBCleanerNotes.openMediaViewer('${validation.mediaFile}', '${validation.mediaType}')" 
                                  style="color: #3b82f6; cursor: pointer;">
                                <i class="fas ${this.getMediaIcon(validation.mediaType)}"></i> View Media
                            </span>
                        </div>
                    ` : ''}
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                        <button class="cleaner-btn cleaner-btn-xs cleaner-btn-success" onclick="MBCleanerNotes.approveTask('${task.id}')">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="cleaner-btn cleaner-btn-xs cleaner-btn-danger" onclick="MBCleanerNotes.rejectTask('${task.id}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
        },

        /**
         * Render task categories
         */
        renderTaskCategories: function() {
            const container = $('#cleaner-task-categories-container');
            if (!container.length) return;

            const categories = {
                special: this.tasks.filter(t => t.noteId).length,
                services: this.tasks.filter(t => !t.noteId && (t.title.includes('Clean') || t.title.includes('Maintenance'))).length,
                manager: this.notes.filter(n => n.addedBy === 'manager').length,
                media: this.tasks.filter(t => t.mediaType !== 'text').length
            };

            const html = `
                <div class="cleaner-category-card" style="background: white; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-sticky-note" style="color: #3b82f6; font-size: 1.25rem;"></i>
                        <div>
                            <div style="font-size: 0.75rem; color: #64748b;">Special Notes</div>
                            <div style="font-size: 1.5rem; font-weight: 600;">${categories.special}</div>
                        </div>
                    </div>
                </div>
                <div class="cleaner-category-card" style="background: white; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-broom" style="color: #10b981; font-size: 1.25rem;"></i>
                        <div>
                            <div style="font-size: 0.75rem; color: #64748b;">Services</div>
                            <div style="font-size: 1.5rem; font-weight: 600;">${categories.services}</div>
                        </div>
                    </div>
                </div>
                <div class="cleaner-category-card" style="background: white; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-user-tie" style="color: #8b5cf6; font-size: 1.25rem;"></i>
                        <div>
                            <div style="font-size: 0.75rem; color: #64748b;">Manager Notes</div>
                            <div style="font-size: 1.5rem; font-weight: 600;">${categories.manager}</div>
                        </div>
                    </div>
                </div>
                <div class="cleaner-category-card" style="background: white; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-photo-video" style="color: #ec4899; font-size: 1.25rem;"></i>
                        <div>
                            <div style="font-size: 0.75rem; color: #64748b;">Media Files</div>
                            <div style="font-size: 1.5rem; font-weight: 600;">${categories.media}</div>
                        </div>
                    </div>
                </div>
            `;

            container.html(html);
        },

        /**
         * Render validation list
         */
        renderValidationList: function() {
            const container = $('#cleaner-validation-list');
            if (!container.length) return;

            const pendingValidations = this.validations.filter(v => v.status === 'pending');
            
            if (pendingValidations.length === 0) {
                container.html('<p style="text-align: center; color: #64748b; padding: 1rem;">No pending validations</p>');
                return;
            }

            let html = '<div style="display: flex; flex-direction: column; gap: 0.75rem;">';
            pendingValidations.forEach(validation => {
                html += `
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                            <strong>${validation.taskTitle}</strong>
                            <span class="cleaner-badge cleaner-badge-warning">Pending</span>
                        </div>
                        <p style="margin: 0.5rem 0; font-size: 0.875rem;">${validation.cleanerNote}</p>
                        ${validation.mediaFile ? `
                            <div style="margin: 0.5rem 0;">
                                <span class="cleaner-media-preview" onclick="MBCleanerNotes.openMediaViewer('${validation.mediaFile}', '${validation.mediaType}')" 
                                      style="color: #3b82f6; cursor: pointer;">
                                    <i class="fas ${this.getMediaIcon(validation.mediaType)}"></i> View Media
                                </span>
                            </div>
                        ` : ''}
                        <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                            <button class="cleaner-btn cleaner-btn-xs cleaner-btn-success" onclick="MBCleanerNotes.approveTask('${validation.taskId}')">
                                Approve
                            </button>
                            <button class="cleaner-btn cleaner-btn-xs cleaner-btn-danger" onclick="MBCleanerNotes.rejectTask('${validation.taskId}')">
                                Reject
                            </button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';

            container.html(html);
        },

        /**
         * Render special tasks from notes
         */
        renderSpecialTasks: function() {
            const container = $('#cleaner-special-tasks-container');
            if (!container || !container.length) return;
            
            container.empty();
            
            // Get tasks that came from notes (client or manager)
            const specialTasks = this.tasks.filter(t => t.noteId);
            
            if (specialTasks.length === 0) {
                container.append('<div style="grid-column: span 2; text-align: center; padding: 1rem; color: #64748b;">No special tasks from notes</div>');
                return;
            }
            
            specialTasks.forEach((task) => {
                const mediaIcon = this.getMediaIcon(task.mediaType);
                const taskDiv = $(`
                    <div class="cleaner-subtask" data-task-id="${task.id}" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; background: #f8fafc; border-radius: 0.375rem;">
                        <label class="cleaner-checkbox" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; flex: 1;">
                            <input type="checkbox" class="subtask-checkbox" ${task.status === 'completed' ? 'checked' : ''} onchange="MBCleanerNotes.updateSpecialTaskStatus(this, '${task.id}')">
                            <span style="font-size: 0.875rem;">${task.title}</span>
                        </label>
                        <span class="subtask-status" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.25rem; background: ${task.status === 'completed' ? '#d1fae5' : '#e2e8f0'}; color: ${task.status === 'completed' ? '#065f46' : '#475569'};">${task.status === 'completed' ? 'Completed' : 'Pending'}</span>
                        ${task.mediaFile ? `
                            <span class="cleaner-media-preview" onclick="MBCleanerNotes.openMediaViewer('${task.mediaFile}', '${task.mediaType}')" style="color: #3b82f6; cursor: pointer; font-size: 0.75rem;">
                                <i class="fas ${mediaIcon}"></i>
                            </span>
                        ` : ''}
                    </div>
                `);
                
                container.append(taskDiv);
            });
            
            // Update special tasks count
            const totalSpecial = specialTasks.length;
            const completedSpecial = specialTasks.filter(t => t.status === 'completed').length;
            $('.special-total-count').text(totalSpecial);
            $('.special-completed-count').text(completedSpecial);
        },

        /**
         * Update subtask status from checkboxes
         */
        updateSubtaskStatus: function(checkbox) {
            const subtaskDiv = $(checkbox).closest('.cleaner-subtask');
            const statusSpan = subtaskDiv.find('.subtask-status');
            const serviceItem = subtaskDiv.closest('.cleaner-service-item');
            
            if (checkbox.checked) {
                statusSpan.text('Completed').css({
                    'background': '#d1fae5',
                    'color': '#065f46'
                });
            } else {
                statusSpan.text('Pending').css({
                    'background': '#e2e8f0',
                    'color': '#475569'
                });
            }
            
            // Update service progress
            this.updateServiceProgress(serviceItem);
            
            // Update overall progress bar
            this.updateOverallProgress();
        },

        /**
         * Update service progress counts
         */
        updateServiceProgress: function(serviceItem) {
            const totalSubtasks = serviceItem.find('.cleaner-subtask').length;
            const completedSubtasks = serviceItem.find('.subtask-checkbox:checked').length;
            
            const progressSpan = serviceItem.find('.service-progress span:first-child');
            progressSpan.text(completedSubtasks);
            
            // Highlight service item if all completed
            if (completedSubtasks === totalSubtasks && totalSubtasks > 0) {
                serviceItem.css({
                    'border-color': '#10b981',
                    'background': '#f0fdf4'
                });
            } else {
                serviceItem.css({
                    'border-color': '#e2e8f0',
                    'background': 'white'
                });
            }
        },

        /**
         * Update overall progress bar
         */
        updateOverallProgress: function() {
            let totalTasks = 0;
            let completedTasks = 0;
            
            // Count all subtasks
            $('.cleaner-subtask').each(function() {
                totalTasks++;
                if ($(this).find('.subtask-checkbox').is(':checked')) {
                    completedTasks++;
                }
            });
            
            const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
            
            $('.cleaner-progress-fill').css('width', percentage + '%');
            $('.cleaner-progress-text').text(percentage + '% Complete');
        },

        /**
         * Update special task status
         */
        updateSpecialTaskStatus: function(checkbox, taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                task.status = checkbox.checked ? 'completed' : 'pending';
                
                // If completed, create validation record
                if (task.status === 'completed') {
                    this.validations.push({
                        id: 'val-' + Date.now(),
                        taskId: task.id,
                        taskTitle: task.title,
                        cleanerNote: 'Task completed. Awaiting review.',
                        mediaType: task.mediaType,
                        mediaFile: task.mediaFile,
                        submittedBy: 'cleaner',
                        submittedByName: this.currentCleaner,
                        submittedDate: new Date().toISOString().split('T')[0],
                        status: 'pending'
                    });
                    
                    // Add system message to chat
                    this.addChatMessage({
                        sender: 'system',
                        senderName: 'System',
                        message: `Task "${task.title}" marked as completed. Validation submitted.`,
                        type: 'system'
                    });
                }
                
                // Update the UI
                const subtaskDiv = $(checkbox).closest('.cleaner-subtask');
                const statusSpan = subtaskDiv.find('.subtask-status');
                
                if (checkbox.checked) {
                    statusSpan.text('Completed').css({
                        'background': '#d1fae5',
                        'color': '#065f46'
                    });
                } else {
                    statusSpan.text('Pending').css({
                        'background': '#e2e8f0',
                        'color': '#475569'
                    });
                }
                
                // Update counts and progress
                this.updateSpecialTasksCount();
                this.updateOverallProgress();
                this.renderTasks();
                this.renderValidationList();
            }
        },

        /**
         * Update special tasks count
         */
        updateSpecialTasksCount: function() {
            const specialTasks = this.tasks.filter(t => t.noteId);
            const totalSpecial = specialTasks.length;
            const completedSpecial = specialTasks.filter(t => t.status === 'completed').length;
            
            $('.special-total-count').text(totalSpecial);
            $('.special-completed-count').text(completedSpecial);
        },

        /**
         * Toggle task status (legacy method)
         */
        toggleTaskStatus: function(taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                task.status = task.status === 'completed' ? 'in-progress' : 'completed';
                if (task.status === 'completed') {
                    // Create validation record
                    this.validations.push({
                        id: 'val-' + Date.now(),
                        taskId: task.id,
                        taskTitle: task.title,
                        cleanerNote: 'Task completed. Awaiting review.',
                        mediaType: task.mediaType,
                        mediaFile: task.mediaFile,
                        submittedBy: 'cleaner',
                        submittedByName: this.currentCleaner,
                        submittedDate: new Date().toISOString().split('T')[0],
                        status: 'pending'
                    });
                    
                    // Add system message to chat
                    this.addChatMessage({
                        sender: 'system',
                        senderName: 'System',
                        message: `Task "${task.title}" marked as completed. Validation submitted.`,
                        type: 'system'
                    });
                }
                this.renderTasks();
                this.updateProgress();
                this.renderValidationList();
            }
        },

        /**
         * Approve task
         */
        approveTask: function(taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (!task) return;

            // Update validation
            const validation = this.validations.find(v => v.taskId === taskId);
            if (validation) {
                validation.status = 'approved';
            }

            // Update task
            task.status = 'completed';
            task.validationSubmitted = true;
            task.validation = {
                status: 'approved',
                note: 'Approved by manager',
                submittedDate: new Date().toISOString().split('T')[0]
            };

            // Add chat message
            this.addChatMessage({
                sender: 'system',
                senderName: 'System',
                message: `Task "${task.title}" has been approved`,
                type: 'system'
            });

            this.renderTasks();
            this.renderValidationList();
            this.updateProgress();
            this.showNotification('Task approved successfully', 'success');
        },

        /**
         * Reject task
         */
        rejectTask: function(taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (!task) return;

            // Set the task title in the modal
            $('#rejection-task-title').text(task.title);
            $('#rejection-task-id').val(taskId);
            
            // Show rejection modal
            $('#cleaner-rejection-modal').css('display', 'flex');
        },

        /**
         * Setup rejection modal
         */
        setupRejectionModal: function() {
            // Check if modal exists, if not create it
            if (!$('#cleaner-rejection-modal').length) {
                $('body').append(`
                    <div class="cleaner-modal-overlay" id="cleaner-rejection-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; align-items: center; justify-content: center;">
                        <div style="background: white; border-radius: 0.5rem; max-width: 500px; width: 90%; max-height: 90%; overflow: hidden;">
                            <div style="padding: 1rem 1.5rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                                <h3 style="margin: 0; font-size: 1.125rem;">Reject Task</h3>
                                <button class="cleaner-modal-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                            </div>
                            <div style="padding: 1.5rem;">
                                <p>Provide feedback for: <strong id="rejection-task-title"></strong></p>
                                <input type="hidden" id="rejection-task-id">
                                <textarea id="cleaner-rejection-note" rows="4" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.375rem; margin: 1rem 0; font-family: inherit;" placeholder="Enter rejection reason and instructions..."></textarea>
                            </div>
                            <div style="padding: 1rem 1.5rem; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; gap: 0.75rem; justify-content: flex-end;">
                                <button class="cleaner-btn cleaner-btn-sm cleaner-btn-secondary" onclick="$('#cleaner-rejection-modal').hide()">Cancel</button>
                                <button class="cleaner-btn cleaner-btn-sm cleaner-btn-danger" id="submit-rejection-btn">Submit Rejection</button>
                            </div>
                        </div>
                    </div>
                `);

                // Bind submit rejection button
                $('#submit-rejection-btn').on('click', () => {
                    const taskId = $('#rejection-task-id').val();
                    this.submitRejection(taskId);
                });
            }
        },

        /**
         * Submit rejection with comment
         */
        submitRejection: function(taskId) {
            const note = $('#cleaner-rejection-note').val().trim();
            if (!note) {
                this.showNotification('Please enter rejection reason', 'error');
                return;
            }

            const task = this.tasks.find(t => t.id === taskId);
            if (!task) return;

            // Update task status
            task.status = 'in-progress';

            // Update validation
            const validation = this.validations.find(v => v.taskId === taskId);
            if (validation) {
                validation.status = 'rejected';
            }

            // Send message to chat
            this.addChatMessage({
                sender: 'manager',
                senderName: 'Manager',
                message: `Task rejected: ${task.title}\nReason: ${note}`,
                type: 'rejection'
            });

            // Hide modal and clear
            $('#cleaner-rejection-modal').hide();
            $('#cleaner-rejection-note').val('');
            $('#rejection-task-id').val('');

            this.renderTasks();
            this.renderValidationList();
            this.updateProgress();
            this.showNotification('Task rejected with feedback', 'warning');
        },

        /**
         * Update progress bar
         */
        updateProgress: function() {
            const totalTasks = this.tasks.length;
            if (totalTasks === 0) {
                $('.cleaner-progress-fill').css('width', '0%');
                $('.cleaner-progress-text').text('0% Complete');
                return;
            }

            const completedTasks = this.tasks.filter(t => t.status === 'completed').length;
            const percentage = Math.round((completedTasks / totalTasks) * 100);
            
            $('.cleaner-progress-fill').css('width', percentage + '%');
            $('.cleaner-progress-text').text(percentage + '% Complete');
        },

        /**
         * Filter tasks
         */
        filterTasks: function() {
            const searchTerm = $('#cleaner-tasks-search').val().toLowerCase();
            const sourceFilter = $('#cleaner-tasks-filter').val();
            const statusFilter = $('#cleaner-tasks-status-filter').val();
            const priorityFilter = $('#cleaner-tasks-priority-filter').val();

            const filteredTasks = this.tasks.filter(task => {
                const matchesSearch = task.title.toLowerCase().includes(searchTerm) ||
                                     task.description.toLowerCase().includes(searchTerm);
                
                const matchesSource = sourceFilter === 'all' || 
                                     (sourceFilter === 'note' && task.noteId) ||
                                     (sourceFilter === 'service' && !task.noteId && task.title.includes('Clean')) ||
                                     (sourceFilter === 'additional' && !task.noteId && !task.title.includes('Clean'));
                
                const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
                const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
                
                return matchesSearch && matchesSource && matchesStatus && matchesPriority;
            });

            this.renderTasksTable(filteredTasks);
        },

        /**
         * Render chat messages
         */
        renderChat: function() {
            const container = $('#cleaner-chat-messages');
            if (!container.length) return;

            container.empty();

            this.chatMessages.forEach(msg => {
                const messageClass = msg.sender === 'manager' ? 'cleaner-chat-message-manager' : 
                                    msg.sender === 'cleaner' ? 'cleaner-chat-message-cleaner' : 'cleaner-chat-message-system';
                
                const bgColor = msg.sender === 'manager' ? '#3b82f6' : 
                               msg.sender === 'cleaner' ? '#f1f5f9' : '#e2e8f0';
                const textColor = msg.sender === 'manager' ? 'white' : '#1e293b';
                
                const html = `
                    <div class="cleaner-chat-message ${messageClass}" style="margin-bottom: 1rem; ${msg.sender === 'manager' ? 'text-align: right;' : ''}">
                        <div style="font-size: 0.75rem; font-weight: 600; color: #64748b; margin-bottom: 0.25rem;">${msg.senderName}</div>
                        <div style="display: inline-block; padding: 0.5rem 1rem; background: ${bgColor}; color: ${textColor}; border-radius: 1rem; max-width: 70%;">
                            ${msg.message}
                        </div>
                        <div style="font-size: 0.688rem; color: #94a3b8; margin-top: 0.25rem;">${msg.timestamp}</div>
                    </div>
                `;
                container.append(html);
            });

            // Scroll to bottom
            container.scrollTop(container[0].scrollHeight);
        },

        /**
         * Send chat message
         */
        sendChatMessage: function() {
            const input = $('#cleaner-chat-input');
            const message = input.val().trim();
            
            if (!message) return;

            this.addChatMessage({
                sender: 'manager',
                senderName: 'Manager',
                message: message,
                type: 'text'
            });

            input.val('');
        },

        /**
         * Add chat message
         */
        addChatMessage: function(msg) {
            const newMsg = {
                id: 'chat-' + Date.now(),
                ...msg,
                timestamp: new Date().toLocaleString()
            };

            this.chatMessages.push(newMsg);
            this.renderChat();
        },

        /**
         * Setup media viewer
         */
        setupMediaViewer: function() {
            if (!$('#cleaner-media-viewer').length) {
                $('body').append(`
                    <div class="cleaner-media-viewer-overlay" id="cleaner-media-viewer" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 10001; align-items: center; justify-content: center;">
                        <div style="background: white; border-radius: 0.5rem; max-width: 90%; max-height: 90%; overflow: hidden;">
                            <div style="padding: 1rem 1.5rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                                <h4 style="margin: 0;">Media Viewer</h4>
                                <button class="cleaner-media-viewer-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                            </div>
                            <div style="padding: 1.5rem; text-align: center; max-height: calc(90vh - 80px); overflow: auto;" id="cleaner-media-viewer-content"></div>
                        </div>
                    </div>
                `);
            }
        },

        /**
         * Open media viewer
         */
        openMediaViewer: function(mediaFile, mediaType) {
            const content = $('#cleaner-media-viewer-content');
            content.empty();

            if (mediaType === 'image') {
                content.html(`<img src="${mediaFile}" alt="Media" style="max-width: 100%; max-height: 70vh;">`);
            } else if (mediaType === 'video') {
                content.html(`
                    <video controls style="max-width: 100%; max-height: 70vh;">
                        <source src="${mediaFile}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `);
            } else if (mediaType === 'audio') {
                content.html(`
                    <audio controls>
                        <source src="${mediaFile}" type="audio/mpeg">
                        Your browser does not support the audio tag.
                    </audio>
                `);
            }

            $('#cleaner-media-viewer').css('display', 'flex');
        },

        /**
         * Close media viewer
         */
        closeMediaViewer: function() {
            $('#cleaner-media-viewer').hide();
            $('#cleaner-media-viewer-content').empty();
        },

        /**
         * Show notification
         */
        showNotification: function(message, type = 'info') {
            // Check if notification container exists
            if (!$('#cleaner-notification-container').length) {
                $('body').append('<div id="cleaner-notification-container" style="position: fixed; top: 1rem; right: 1rem; z-index: 10002;"></div>');
            }

            const colors = {
                success: '#10b981',
                error: '#ef4444',
                warning: '#f59e0b',
                info: '#3b82f6'
            };

            const notification = $(`
                <div style="background: white; border-left: 4px solid ${colors[type]}; padding: 1rem 1.5rem; border-radius: 0.375rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 0.5rem; animation: slideIn 0.3s ease;">
                    ${message}
                </div>
            `);

            $('#cleaner-notification-container').append(notification);
            
            setTimeout(() => {
                notification.fadeOut(() => notification.remove());
            }, 3000);
        },

        /**
         * Get media icon
         */
        getMediaIcon: function(mediaType) {
            const icons = {
                'text': 'fa-file-alt',
                'image': 'fa-image',
                'video': 'fa-video',
                'audio': 'fa-volume-up'
            };
            return icons[mediaType] || 'fa-file';
        },

        /**
         * Get media label
         */
        getMediaLabel: function(mediaType) {
            const labels = {
                'text': 'Text',
                'image': 'Image',
                'video': 'Video',
                'audio': 'Audio'
            };
            return labels[mediaType] || 'File';
        }
    };

    // Make it globally accessible
    window.MBCleanerNotes = MBCleanerNotes;

    // Initialize when document is ready
    $(document).ready(function() {
        MBCleanerNotes.init();
        
        // Tab switching functionality
        $('.cleaner-tab').on('click', function() {
            const tabId = $(this).data('tab');
            
            // Update tab active states
            $('.cleaner-tab').removeClass('active');
            $(this).addClass('active');
            
            // Show corresponding tab pane
            $('.cleaner-tab-pane').removeClass('active');
            $(`#cleaner-${tabId}-tab`).addClass('active');
        });
    });

})(jQuery);