using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    public class MovieController : ApiController
    {
        ApplicationDbContext db;

        public MovieController()
        {
            db = new ApplicationDbContext();
        }
        
        // GET api/values
        public IHttpActionResult Get()
        {
            // Retrieve all movies from db logic
            var movies = db.Movies.ToList();
            return Ok(movies);
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {
            // Retrieve movie by id from db logic
            var movie = db.Movies.Find(id);
            return Ok(movie);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Movie value)
        {
            // Create movie in db logic
            Movie movie = new Movie();
            movie.Title = value.Title;
            movie.Director = value.Director;
            movie.genre = value.genre;
            db.Movies.Add(movie);
            db.SaveChanges();
        }

        // PUT api/values/5
        [HttpPost]
        public void Put(int id, [FromBody]Movie value)
        {
            // Update movie in db logic
            var movieToEdit = db.Movies.FirstOrDefault(m => m.MovieId == id);
            movieToEdit.Title = value.Title;
            movieToEdit.Director = value.Director;
            movieToEdit.genre = value.genre;
            db.Entry(movieToEdit).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        // DELETE api/values/5
        [HttpPost]
        public void Delete(int id)
        {
            // Delete movie from db logic
            var movieToDelete = db.Movies.Find(id);
            db.Movies.Remove(movieToDelete);
            db.SaveChanges();
        }
    }

}