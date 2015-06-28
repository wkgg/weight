# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150628013215) do

  create_table "projects", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "yingye"
    t.string   "qiye"
    t.string   "zhuce"
    t.string   "fading"
    t.string   "ziben"
    t.string   "gongsi"
    t.string   "dengji"
    t.string   "chengli"
    t.string   "qixian"
    t.string   "jingying"
    t.string   "shuiwu"
    t.string   "zuzhi"
    t.string   "daikuan"
    t.string   "texu"
    t.string   "lianxi"
    t.string   "youbian"
    t.string   "dianhua"
    t.string   "qiyezhu"
  end

  create_table "scores", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "standard"
    t.string   "score"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stand_names", force: :cascade do |t|
    t.integer  "project_id"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "stand_names", ["project_id"], name: "index_stand_names_on_project_id"

  create_table "standards", force: :cascade do |t|
    t.integer  "project_id"
    t.string   "stand12"
    t.string   "stand13"
    t.string   "stand23"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "stand14"
    t.string   "stand15"
    t.string   "stand24"
    t.string   "stand25"
    t.string   "stand34"
    t.string   "stand35"
    t.string   "stand45"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "password_hash"
    t.string   "password_salt"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "role"
  end

end
