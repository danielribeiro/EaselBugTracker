require 'rubygems'
require 'rake'
require 'rake/clean'
require 'rake/gempackagetask'
require 'rake/rdoctask'
require 'rake/testtask'
require 'spec/rake/spectask'


task :default => [:compile_watch]
#################################
## Custom tasks
#################################
#$LOAD_PATH.unshift File.join(File.dirname(__FILE__),'lib')
def compileall(from, to)
  require 'coffeecompiler'
  
  outDir = File.expand_path to
  coffeeDir = File.expand_path from
  puts "Compiling all files: #{coffeeDir} -> #{outDir}"
  compiler = CoffeeCompiler.new './globalizer.coffee'
  begin
    compiler.compileAll(__FILE__, coffeeDir, outDir)
  rescue Exception => ex
    puts ex.inspect
  end

end

desc "compile all coffeescripts and start watching them"
task :compile_watch do
  compileall 'lib', 'public'
  system "watchr", 'compileall.rb'
end
