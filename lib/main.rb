require 'rubygems'
require 'sinatra'

set :public, File.expand_path('public')
get '/' do
  File.read(File.join('public', 'app.html'))
end


