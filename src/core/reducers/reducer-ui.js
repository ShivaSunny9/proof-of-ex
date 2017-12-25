import constants from 'core/types'

const initialState = {
	leftNavOpen  : false,
	rightNavOpen : false,
	showModal    : false,
	modalActions : [],
	modalTitle   : '',
	modalContent : null,
	modalClassName : ''
}

export function uiReducer(state = initialState, action) {
	switch (action.type) {

	case constants.SHOW_MODAL:
		return Object.assign({}, state, {
			showModal    : true,
			modalActions : action.actions,
			modalTitle   : action.title,
			modalContent : action.content,
			modalClassName : action.className
		})

	case constants.CLOSE_MODAL:
		return Object.assign({}, state, {
			showModal    : false,
			modalActions : [],
			modalTitle   : '',
			modalContent : '',
			modalClassName : ''
		})

	case constants.OPEN_LEFT_NAV:
		return Object.assign({}, state, {
			leftNavOpen: true
		})

	case constants.CLOSE_LEFT_NAV:
		return Object.assign({}, state, {
			leftNavOpen: false
		})

	case constants.OPEN_RIGHT_NAV:
		return Object.assign({}, state, {
			rightNavOpen: true
		})

	case constants.CLOSE_RIGHT_NAV:
		return Object.assign({}, state, {
			rightNavOpen: false
		})

	case constants.CLEAR_UI:
		return Object.assign({}, state, {
			leftNavOpen 	: false,
			rightNavOpen	: false,
			showModal   	: false,
			modalActions  : [],
			modalTitle    : '',
			modalContent	: ''
		})

	default:
		return state
	}
}