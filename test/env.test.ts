import * as dotenv from 'dotenv';
dotenv.config();
test('MONGOURI exists',()=>{
    expect(process.env.MONGOURI).toBeDefined()
})
test('PORT exists',()=>{
    expect(process.env.PORT).toBeDefined()
})

test('DISCORD_CLIENT_ID exists',()=>{
    expect(process.env.DISCORD_CLIENT_ID).toBeDefined()
})

test('DISCORD_CLIENT_SECRET exists',()=>{
    expect(process.env.DISCORD_CLIENT_SECRET).toBeDefined()
})

test('DISCORD_REDIRECT_URI exists',()=>{
    expect(process.env.DISCORD_REDIRECT_URI).toBeDefined()
})

test('FRONTEND_URL exists',()=>{
    expect(process.env.FRONTEND_URL).toBeDefined()
})