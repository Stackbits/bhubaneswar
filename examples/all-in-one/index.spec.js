import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import server from './index';

chai.use(chaiHttp);

describe('/ hello world', () => {
    it('it should GET helloWorld', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.a.property('message');
                done();
            });
    });
});
