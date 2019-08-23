let chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should=chai.should();
let server = require("../index");
// let token=null;
// let email=null;

var expect = chai.expect;

describe('Login', ()=>{
    it("Should check credentials and return status code 200", (done)=>{
        let data={
            email: "toshakamath@gmail.com",
            password: "tosha"
        }
        chai.request(server)
        .post('/student_login')
        .send(data)
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        })
    })
    it("Should check credentials and not log in", (done)=>{
        let data={
            email: "toshakamath@gmail.com",
            password: "toshawrong"
        }
        chai.request(server)
        .post('/student_login')
        .send(data)
        .end((err,res)=>{
            res.should.have.status(400);
            done();
        })
    })
})

describe('Update profile', () => {
  it('update user city and company', (done)=>{
      let data={
        "em": "toshakamath@gmail.com",
        "name": "Tosha Kamath",
        "email": "toshakamath@gmail.com",
        "phone": "8182070762",
        "gender": "F",
        "aboutme": "Awesome",
        "city": "San Mateo",
        "company": "IBM",
        "languages": "English",
        "school": "San Jose State University",
        "hometown": "Mumbai",
      }
    chai.request(server)
      .post('/student/profile/update')
      .send(data)
      .end((err,res)=>{
          res.should.have.status(200);
          done();
      })
  })
  it("Match updated City from student profile", (done)=>{
      let data={
        email:"toshakamath@gmail.com"
      }
      chai.request(server)
      .post('/studenthome/dashboard')
      .send(data)
      .end((err,res)=>{
          res.should.have.status(200);
          res.body[0].should.have.property('city').eql('San Mateo')
          done();
      })
  })
})

describe('Announcements', () => {
    it('Creating a New Announcement', (done)=>{
        let data={
            announcementdesc: "Quiz will be postponed to 15th April 2019",
            announcementtitle: "Quiz Details",
            courseid: "248",
            em: "toshakamath@gmail.com",
        }
      chai.request(server)
        .post('/home/createannouncement')
        .send(data)
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        })
    })
  })