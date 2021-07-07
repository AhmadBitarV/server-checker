import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import {Servers} from './Servers';

import Server from './Server/Server';
import Spinner from '../../Components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});


describe("Testing <Servers /> Container", () => {
    it("Should render more than one <Server /> if the user is authenticated ", () => {
        const wrapper = shallow(<Servers onFetchServers={() => {}} isAuthentiated={true} servers={[{name: 'Dummy Server', id:2, distance: 22}]}/>);
        expect(wrapper.find(Server)).toHaveLength(2);
    });

    it("Should render only one <Server /> if the user is not authenticated ", () => {
        const wrapper = shallow(<Servers onFetchServers={() => {}} isAuthentiated={false} servers={[{name: 'Dummy Server', id:2, distance: 22}]}/>);
        expect(wrapper.find(Server)).toHaveLength(1);
    });

    it("Should render a spinner while loading ", () => {
        const wrapper = shallow(<Servers onFetchServers={() => {}} loading={true} isAuthentiated={false} servers={[{name: 'Dummy Server', id:2, distance: 22}]}/>);
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });

})