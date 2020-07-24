import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Modal from './Modal';

configure({ adapter: new Adapter() })

describe('<Modal />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Modal />);
    })

    it('should have no open class', () => {
        expect(wrapper.find('.overlay').hasClass('shwo')).toBeFalsy()
    })

    it('should have open class when passing isOpen and hideFooter', () => {
        wrapper.setProps({ isOpen: true, hideFooter: true })
        expect(wrapper.find('.overlay').hasClass('show')).toBe(true)
    })
})