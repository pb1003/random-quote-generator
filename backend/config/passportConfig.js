import passport from 'passport';
import LocalStrategy from 'passport-local';
import { PrismaClient } from '@prisma/client';
import { compareSync } from 'bcrypt';



const prisma = new PrismaClient()




passport.use(new LocalStrategy(async (username, password, done) => {

  try {


    const user = await prisma.user.findFirst({
      where: {
        username: username
      }
    })

    if (!user) {
      return done(null, false)
    }

    if (!compareSync(password,user.password)) {
      return done(null, false)
    }

    return done(null, user)
  }
  catch (err) {
    return done(err, false)

  }
}))


passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    done(null,user)
  }
  catch(err){
    done(error,false)
  }
})

export default passport
