
Adipisici CMS
===

An API-First Content Management System.

Current Version: 0.1.0


Why this?
===

Content Management Systems are all that stand between developers and static files.
Great, but sometimes a CMS takes it too far.

Some problems with a traditional CMS:
 * They force you to use their front end tools. A WYSIWYG can only take you so far, and even designing custom templates you are still limited in what technologies you can use.
 * They force you to deal with their bloat. A traditional CMS will have you serving up all sorts of crap that you aren't using. This means longer page loads (correlated to fewer conversions), and greater server costs.
 * Nothing is tailor made for your application.

These are not problems for everybody. For people without a background in web design, a WYSIWYG is empowering, not limiting. But some people want or need to be in greater control.

Adipisici CMS is a project to make a CMS that does what a Content Management System should do.. manage content, while remaining completely impartial to the rest of your stack.

Adipisici CMS uses:
 * Node.js - for server side scripting
 * MongoDB - for storing content
 * Git - for creating integrated version control ( future )
 * NPM - for package management and installation

The goal of Adipisici is to provide a developer friendly, REST API Content Management System that allows you to build websites, mobile apps, and more around your content.


Development
===

Adipisici is still under development, and may be for a while. It is not yet ready for production use, though has already been used effectively for creating demos, and non-production code, typically at hackathons. Breaking changes can be expected to occur frequently and unanounced until release of 1.x

Todo List:
 * Refactor 
 * Implement Managed endpoints ( security )
 * Update Content validation and consider migrating backend mongoose ( CMS )
 * Integrate Hammer for general Express Security ( security )
 * Rate limit authentication ( security )
 * Client-side resource caching for get requests ( optimization, security )
 * Sessions implementation ( security )
 * Implement hooks ( CMS )
 * Integrate Analytics ( CMS )
 * Integrated VCS enabled directories ( CMS )
 * Admin control panel ( CMS )
 * Pre-release site versioning ( CMS )
 * Support for collaboration ( admin, security )
 * Support for authenticated sites ( security )
